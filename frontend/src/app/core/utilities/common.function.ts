// import moment from 'moment';
import { Observable, from } from 'rxjs';
import { ACCESS_TOKEN } from 'src/app/core/constants/global.constant';

export function IsEmptyObject(obj: any) {
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  else return false;
}

// export function GetDate(date?: any, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
//   let jsonDate;
//   if (date) jsonDate = new Date(date);
//   else jsonDate = new Date();
//   return moment(jsonDate).format(format);
// }

export function IsNullOrEmpty(string: any) {
  return !string || string === '';
}

export function IsNullOrWhitespace(str: string | undefined | null): boolean {
  return !str || str?.trim() === '';
}

export function generateGUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace);
}

export function formatDate(input: any): string {
  let date: Date;
  if (input instanceof Date) {
    date = input;
  } else if (typeof input === 'string' || typeof input === 'number') {
    date = new Date(input);
  }
  else {
    return '';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// export function GetDateOnly(date?: any, format: string = 'YYYY-MM-DD'): string {
//   let jsonDate;
//   if (date) jsonDate = new Date(date);
//   else jsonDate = new Date();
//   return moment(jsonDate).format(format);
// }

export function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
  b64Data = b64Data.split('base64,')[1];
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}


function getAccessTokenFromStorage(): string | null {
  try {
    const storedValue = localStorage.getItem(ACCESS_TOKEN);
    if (!storedValue || storedValue === 'null') {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);
    return typeof parsedValue === 'string' ? parsedValue : null;
  } catch {
    return null;
  }
}

export async function getBase64ImageFromUrl(imageUrl) {
  try {
    if(imageUrl=="" || imageUrl==undefined) return "";
    const token = getAccessTokenFromStorage();
    var res = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        "Cache-Control": 'no-cache',
        'Authorization': `Bearer ${token}`
      },
      
    });
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        const base64String = reader.result as string;
        if (base64String.startsWith('data:image/jpeg;base64,')) {
          resolve(base64String);
        } else {
          resolve(`data:image/jpeg;base64,${base64String.split(';base64,')[1]}`);
        }
        //resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  } catch (e) {
    console.log('getBase64ImageFromUrl', e)
    return ''
  }
}

/** Guess MIME from URL path when the server sends the wrong Content-Type (e.g. SVG served as image/jpeg). */
function inferImageMimeFromUrlPath(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const path = url.split('?')[0].split('#')[0].toLowerCase();
  if (path.endsWith('.svg')) return 'image/svg+xml';
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg';
  if (path.endsWith('.gif')) return 'image/gif';
  if (path.endsWith('.webp')) return 'image/webp';
  return null;
}

function resolveMimeForFetchedImage(url: string, blob: Blob, res: Response): string {
  const fromPath = inferImageMimeFromUrlPath(url);
  if (fromPath) return fromPath;

  const header = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (header.includes('svg')) return 'image/svg+xml';
  if (header.startsWith('image/')) return header;

  const bt = (blob.type || '').toLowerCase();
  if (bt.includes('svg')) return 'image/svg+xml';
  if (bt.startsWith('image/')) return blob.type;

  return 'image/jpeg';
}

/**
 * Fetches an image URL (with auth) and returns a correct `data:image/...;base64,...` string.
 * Use when MIME matters (e.g. SVG). Does not change {@link getBase64ImageFromUrl} behavior.
 */
export async function getImageDataUrlFromAuthenticatedUrl(imageUrl: string): Promise<string> {
  try {
    if (imageUrl == '' || imageUrl == undefined) return '';
    if (typeof imageUrl === 'string' && imageUrl.startsWith('data:image/')) {
      return imageUrl;
    }
    const token = getAccessTokenFromStorage();
    const res = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = await res.blob();
    const mime = resolveMimeForFetchedImage(imageUrl, blob, res);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        const base64String = reader.result as string;
        const payload = base64String.split(';base64,')[1];
        if (!payload) {
          resolve(base64String);
          return;
        }
        resolve(`data:${mime};base64,${payload}`);
      }, false);

      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.log('getImageDataUrlFromAuthenticatedUrl', e);
    return '';
  }
}

export async function getBase64ImageFromPublicUrl(imageUrl) {
  try {
    if(imageUrl=="" || imageUrl==undefined) return "";
    // For public URLs, don't send Authorization headers
    var res = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        "Cache-Control": 'no-cache'
      },
      mode: 'cors'
    });
    
    if (!res.ok) {
      console.error('Failed to fetch public image:', res.status, res.statusText);
      return '';
    }
    
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        const base64String = reader.result as string;
        if (base64String.startsWith('data:image/')) {
          resolve(base64String);
        } else {
          // Try to detect image type from blob
          const imageType = blob.type || 'image/png';
          resolve(`data:${imageType};base64,${base64String.split(';base64,')[1] || base64String}`);
        }
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  } catch (e) {
    console.log('getBase64ImageFromPublicUrl', e)
    return ''
  }
}

export function formatDateDifference(dateInput: any): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  const inputDate = new Date(dateInput);
  inputDate.setHours(0, 0, 0, 0); // Set time to midnight

  const timeDiff = Math.abs(today.getTime() - inputDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays <= 14) {
    return `${diffDays} days ago`;
  } else if (diffDays <= 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays <= 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

export function findUpcomingDate(dateInput: any): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight

  const inputDate = new Date(dateInput);
  inputDate.setHours(0, 0, 0, 0); // Set time to midnight

  const timeDiff = inputDate.getTime() - today.getTime();
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else if (diffDays > 1 && diffDays <= 14) {
    return `In ${diffDays} days`;
  } else if (diffDays > 14 && diffDays <= 30) {
    const weeks = Math.floor(diffDays / 7);
    return `In ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  } else if (diffDays > 30 && diffDays <= 365) {
    const months = Math.floor(diffDays / 30);
    return `In ${months} ${months === 1 ? 'month' : 'months'}`;
  } else if (diffDays > 365) {
    const years = Math.floor(diffDays / 365);
    return `In ${years} ${years === 1 ? 'year' : 'years'}`;
  } else {
    return 'Date Overdue';
  }
}




export function getResumeTemplateMargin(isMultiPage) {
  if (document.querySelector('.template-1'))
    return 198;//265;//198

  if (document.querySelector('.template-2'))
    return isMultiPage ? 25 : 40;
}

export function replaceNewLineToBR(item: any) {
  if (item == undefined) return

  let keys = Object.keys(item);
  if (keys == undefined) return;

  keys.forEach(prop => {
    if (typeof item[prop] === 'string') {
      item[prop] = item[prop].replace(/\n/g, '<br/>');
    }
  });
}

export function isMobile() {
  // credit to Timothy Huang for this regex test: 
  // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true
  }
  else {
      return false
  }
}

export function  darkenHexColor(hex, percent = 0.3) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.floor(r * (1 - percent));
  g = Math.floor(g * (1 - percent));
  b = Math.floor(b * (1 - percent));

  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// File chip helpers
export function getFileExtensionFromUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  try {
    const cleanUrl = url.split('#')[0].split('?')[0];
    const lastSegment = cleanUrl.split('/').pop() || '';
    const hasDot = lastSegment.lastIndexOf('.') > -1;
    if (!hasDot) return null;
    const ext = lastSegment.substring(lastSegment.lastIndexOf('.') + 1).toLowerCase();
    return ext || null;
  } catch {
    return null;
  }
}

export function getFileNameFromUrl(url: string | null | undefined, stripDocumentPrefix: boolean = true): string {
  if (!url || typeof url !== 'string') return '';
  try {
    const lastSegment = url.split('/').pop() || '';
    const withoutQuery = lastSegment.split('#')[0].split('?')[0];
    const decoded = decodeURIComponent(withoutQuery);
    if (!stripDocumentPrefix) {
      return decoded;
    }
    return decoded.replace(/^[^_]+_document_/, '');
  } catch {
    return '';
  }
}

export function getFileChipMeta(url: string | null | undefined): { label: string; colorClass: string; kind: 'pdf' | 'document' | 'excel' | 'ppt' | 'image' | 'other' } | null {
  const ext = getFileExtensionFromUrl(url);
  if (!ext) return null;

  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  const documentExts = ['doc', 'docx'];
  const excelExts = ['xls', 'xlsx', 'csv', 'xlsm'];
  const pptExts = ['ppt', 'pptx'];

  let kind: 'pdf' | 'document' | 'excel' | 'ppt' | 'image' | 'other' = 'other';
  let colorClass = 'bg-gray';

  if (ext === 'pdf') {
    kind = 'pdf';
    colorClass = 'bg-yellow-primary';
  } else if (documentExts.includes(ext)) {
    kind = 'document';
    colorClass = 'bg-docs-blue';
  } else if (excelExts.includes(ext)) {
    kind = 'excel';
    colorClass = 'bg-excel-green';
  } else if (pptExts.includes(ext)) {
    kind = 'ppt';
    colorClass = 'bg-ppt-orange';
  } else if (imageExts.includes(ext)) {
    kind = 'image';
    colorClass = 'bg-purple';
  }

  return {
    label: ext.toUpperCase(),
    colorClass,
    kind
  };
}

export function getFileChipMetaFromExtension(ext: string | null | undefined): { label: string; colorClass: string; kind: 'pdf' | 'document' | 'excel' | 'ppt' | 'image' | 'other' } | null {
  if (!ext) return null;
  
  // Normalize extension to lowercase
  const normalizedExt = ext.toLowerCase().replace(/^\./, '');

  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  const documentExts = ['doc', 'docx'];
  const excelExts = ['xls', 'xlsx', 'csv', 'xlsm'];
  const pptExts = ['ppt', 'pptx'];

  let kind: 'pdf' | 'document' | 'excel' | 'ppt' | 'image' | 'other' = 'other';
  let colorClass = 'bg-gray';

  if (normalizedExt === 'pdf') {
    kind = 'pdf';
    colorClass = 'bg-yellow-primary';
  } else if (documentExts.includes(normalizedExt)) {
    kind = 'document';
    colorClass = 'bg-docs-blue';
  } else if (excelExts.includes(normalizedExt)) {
    kind = 'excel';
    colorClass = 'bg-excel-green';
  } else if (pptExts.includes(normalizedExt)) {
    kind = 'ppt';
    colorClass = 'bg-ppt-orange';
  } else if (imageExts.includes(normalizedExt)) {
    kind = 'image';
    colorClass = 'bg-purple';
  }

  return {
    label: normalizedExt.toUpperCase(),
    colorClass,
    kind
  };
}