//all the template should be like below ones
export const TEMPLATE = `<div class="flex">
<div class="min-w-[280px] max-w-[280px] bg-primary pt-[50px] pl-[20px] pb-[40px] flex flex-col gap-[25px]">
  <div class="flex flex-col gap-[18px]">
  <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; border: 2px solid #ccc; background-image: url('{{ getImage() }}'); background-size: cover; background-position: center;"></div>
   
    <div>
      <p class="fw-bold text-text-white text-[24px] leading-[30px] mb-[3px]">
        {{ resumeData.assignedUser.fullName }}
      </p>
      <p class="fw-medium text-text-white text-[18px] leading-[24px]">
        {{ resumeData.assignedUser.jobPosition }}
      </p>
    </div>
    <div class="flex flex-col gap-[13px]">
      <div class="flex gap-[12px]" *ngIf='resumeData.phone'>
        <mat-icon class="text-text-white h-[20px] w-[20px] text-[20px]">call</mat-icon>
        <p class="fw-medium text-text-white text-[16px] leading-[20px]">
          {{ resumeData.assignedUser.phoneNumber }}
        </p>
      </div>
      <div class="flex gap-[12px]"  *ngIf='resumeData.email'>
        <mat-icon class="text-text-white h-[20px] w-[20px] text-[20px]">mail</mat-icon>
        <p class="fw-medium text-text-white text-[16px] leading-[20px]">
          {{  resumeData.assignedUser.email }}
        </p>
      </div>
      <div class="flex gap-[12px]"  *ngIf='resumeData.linkedIn'>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.692 0.5H1.66497C1.02223 0.5 0.5 1.02953 0.5 1.67957V15.6811C0.5 16.3311 1.02223 16.8607 1.66497 16.8607H15.692C16.3348 16.8607 16.8607 16.3311 16.8607 15.6811V1.67957C16.8607 1.02953 16.3348 0.5 15.692 0.5ZM5.44472 14.5234H3.01983V6.71559H5.44837V14.5234H5.44472ZM4.23227 5.64922C3.45441 5.64922 2.82628 5.01744 2.82628 4.24323C2.82628 3.46902 3.45441 2.83724 4.23227 2.83724C5.00648 2.83724 5.63827 3.46902 5.63827 4.24323C5.63827 5.02109 5.01014 5.64922 4.23227 5.64922ZM14.5344 14.5234H12.1095V10.7254C12.1095 9.81973 12.0912 8.65476 10.8496 8.65476C9.58601 8.65476 9.39246 9.64079 9.39246 10.6597V14.5234H6.96757V6.71559H9.29385V7.78195H9.32672C9.65174 7.16843 10.4442 6.52204 11.6238 6.52204C14.0779 6.52204 14.5344 8.13984 14.5344 10.2434V14.5234Z"
            fill="white" />
        </svg>

        <p class="fw-medium text-text-white text-[16px] leading-[20px]">
          {{ resumeData.linkedIn }}
        </p>
      </div>
    </div>
  </div>

  <div *ngIf="resumeData.qualifications.length > 0" class="flex flex-col gap-[20px]">
    <div class="border border-text-white"></div>
    <p class="fw-bold text-text-white text-[18px] leading-[24px]">
      Qualifications
    </p>
    <div class="flex flex-col gap-[18px]">
      <div class="qualifications-container" *ngFor="let item of resumeData.qualifications">
        <p class="fw-bold text-text-white text-[14px] leading-[18px]">
          {{ item.name }}
        </p>
        <p class="text-text-white text-[14px] leading-[18px]">
          {{ item.durationStart | date:'MMM-yyyy'}} - {{ item.durationEnd |date:'MMM-yyyy' }}
        </p>
        <p class="text-text-white text-[14px] leading-[18px]">
          {{ item.organisation }}
        </p>
      </div>
    </div>
  </div>
  <div *ngIf="resumeData.certifications.length > 0" class="flex flex-col gap-[20px] max-w-[276px]">
    <div class="border border-text-white"></div>
    <p class="fw-bold text-text-white text-[18px] leading-[24px]">
      Certifications
    </p>
    <div class="flex flex-col gap-[17px]">
      <div class="certifications-container" *ngFor="let item of resumeData.certifications">
        <p class="fw-bold text-text-white text-[14px] leading-[18px]">
          {{ item.name }}
        </p>
        <p class="text-text-white text-[14px] leading-[18px]">{{ item.organisation }}</p>
      </div>
    </div>
  </div>
  <div *ngIf="resumeData.skills.length > 0" class="flex flex-col gap-[20px]">
    <div class="border border-text-white"></div>
    <p class="fw-bold text-text-white text-[18px] leading-[24px]">Skills</p>
    <div class="flex flex-col gap-[17px] pr-[30px]">
      <div class="flex items-center gap-[30px]">
        <p class="fw-bold text-text-white text-[14px] leading-[18px] w-[60px]">
          Skill
        </p>
        <p class="fw-bold text-text-white text-[14px] leading-[18px]">
          Proficiency
        </p>
      </div>



      <div class="flex items-center justify-between gap-[30px]"
        *ngFor="let item of resumeData.skills">
        <p class="fw-bold text-text-white text-[14px] leading-[18px] w-[60px]"> {{ item.name }}
        </p>
        <div style="width: 120px; height: 8px; border-radius: 15px; background-color: #DDFFFA; position: relative;">
          <div style="height: 8px; border-radius: 15px; position: absolute; width: {{getProfeciencyWidth(item)}}%; background-color: #ffbc4a;">
          </div>
        </div>
      </div>


    </div>
  </div>
</div>


<div class="flex flex-col pb-[40px]">
  <div class="min-w-[500px] min-h-[200px] max-w-[964px] bg-[#DDFFFA] pt-[25px] pl-[40px] pr-[30px]">
    <div class="flex flex-col gap-[10px]" *ngIf='resumeData.bio'>
      <p class="text-primary fw-bold text-[24px] leading-[30px]">Profile</p>
      <p class="text-[12px] leading-[20px] text-[#2e3c3b]">
        {{ resumeData.bio }}
      </p>
    </div>
  </div>
  <div *ngIf="resumeData.experience.length > 0" class="pt-[25px] pl-[40px] pr-[30px]">
    <p class="text-primary fw-bold text-[24px] leading-[30px] mb-[10px]">
      Work Experience
    </p>
    <div class="mb-[20px]">
      <div class="work-experience" *ngFor="let item of resumeData.experience">
        <p class="fw-bold text-[18px] leading-[24px] text-text-[#2e3c3b] mb-[5px]">
          {{ item.role }}
        </p>
        <div class="flex mb-[15px]">
          <p class="mr-[8px] fw-medium text-[14px] leading-[20px] text-[#2e3c3b]">
            {{ item.company }}
          </p>
          <p class="fw-medium text-[14px] leading-[20px] text-[#2e3c3b]">
            | {{ item.durationStart | date:'MMM-yyyy'}} - {{ item.durationEnd | date:'MMM-yyyy' }}
          </p>
        </div>
        <div [innerHTML]="getDescription(item)"></div>
      </div>
    </div>
  </div>
</div>
</div>`;

export const policyMediaSharkTemplate1 = [
  {
    id : 'header_563298_element',
    template : `<!-- header -->
        <div class="policy-header-container-template-1" #header_563298_element>
        <div class="row">
          <div class="col-md-12">
            <div class="flex justify-start mb-4">
              <svg width="281" height="51" viewBox="0 0 281 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.6142 9.59531C35.7856 9.59531 37.6717 13.8814 37.6717 18.6893V32.8906H30.3295V20.4774C30.3295 17.2081 29.5131 15.4125 26.8606 15.4125C24.007 15.4125 22.7308 17.75 22.7308 21.3381V32.8906H15.3428V20.4774C15.3428 17.2081 14.5264 15.4125 11.8431 15.4125C9.0395 15.4125 7.71326 17.75 7.71326 21.3381V32.8906H0.347656V10.2073H7.68985V13.7327C8.90326 11.2316 11.411 9.59531 14.8298 9.59531C18.8074 9.59531 20.9969 11.4345 21.9687 14.1418C23.1395 11.5864 25.8931 9.59531 29.6142 9.59531Z" fill="white"/>
                <path d="M58.4214 19.2515C58.2692 17.0033 56.8429 14.9654 54.0393 14.9654C51.0792 14.9654 49.703 16.8556 49.2943 19.2515H58.4214ZM65.3591 25.4353C64.1926 30.5937 60.1553 33.5039 54.2416 33.5039C47.0505 33.5039 41.9531 29.1126 41.9531 21.9088C41.9531 14.7051 47.1559 9.5966 54.0893 9.5966C61.5827 9.5966 65.5103 14.755 65.5103 20.9388V23.187H49.1782C49.3837 26.1982 51.6242 27.9364 54.4821 27.9364C57.0292 27.9364 58.612 26.9663 59.4283 24.8743L65.3591 25.4353Z" fill="white"/>
                <path d="M86.8223 21.2926C86.8223 17.6695 84.734 15.3702 81.7239 15.3702C78.2241 15.3702 76.5754 17.8713 76.5754 21.5497C76.5754 25.2281 78.2092 27.7834 81.7239 27.7834C84.734 27.7834 86.8223 25.4852 86.8223 21.8068V21.2926ZM86.8223 28.8555C85.7526 31.5128 83.1012 33.5039 79.2279 33.5039C72.5467 33.5039 69.1172 28.2435 69.1172 21.5497C69.1172 14.856 72.5318 9.5966 79.2279 9.5966C83.1161 9.5966 85.7526 11.5867 86.8223 14.295V0.708786H94.2113V32.8919H86.8223V28.8555Z" fill="white"/>
                <path d="M107.314 32.8906H99.9758V10.2062H107.314V32.8906ZM99.9258 0.707493H107.423V7.45969H99.9258V0.707493Z" fill="white"/>
                <path d="M126.438 22.8152L122.717 23.594C120.422 24.054 118.996 24.615 118.996 26.4032C118.996 27.7324 120.015 28.5463 121.598 28.5463C124.3 28.5463 126.438 26.5052 126.438 23.2869V22.8152ZM133.679 26.7114C133.679 27.8801 134.188 28.3944 135.106 28.3944C135.757 28.4135 136.403 28.2807 136.993 28.0055V31.9399C135.607 32.9599 133.919 33.4816 132.201 33.421C129.499 33.421 127.508 31.9909 126.846 29.4388C125.563 32.0069 122.767 33.4009 119.248 33.4009C114.711 33.4009 111.859 31.1027 111.859 27.2214C111.859 22.8779 115.123 21.0387 120.119 20.0686L126.443 18.9424V18.5524C126.443 16.4062 125.373 15.128 123.129 15.128C120.987 15.128 119.918 16.4561 119.508 18.3463L112.677 17.8363C113.454 12.9807 117.062 9.61042 123.538 9.61042C129.452 9.61042 133.684 12.2677 133.684 18.4472L133.679 26.7114Z" fill="white"/>
                <path d="M145.397 25.3301C145.7 27.5231 147.435 28.7514 150.187 28.7514C152.175 28.7514 153.504 28.0342 153.504 26.8027C153.504 25.6765 152.79 25.0656 150.954 24.7574L147.497 24.2124C142.297 23.3932 139.494 21.605 139.494 17.1096C139.494 12.7182 143.317 9.60087 149.383 9.60087C155.811 9.60087 159.633 12.4611 160.092 17.3157L154.022 17.5186C153.668 15.5275 152.077 14.4012 149.282 14.4012C147.447 14.4012 146.326 15.1801 146.326 16.3956C146.326 17.3157 147.037 17.8767 148.162 18.0286L152.544 18.8074C157.49 19.5873 160.348 21.7729 160.348 26.1132C160.348 30.8668 156.319 33.5156 150.149 33.5156C143.977 33.5156 139.388 31.0145 138.98 25.498L145.397 25.3301Z" fill="white"/>
                <path d="M172.175 32.8906H164.84V0.7075H172.182V13.7327C173.407 11.2316 176.16 9.59531 179.571 9.59531C185.688 9.59531 187.736 13.8336 187.736 18.6892V32.8906H180.395V20.4774C180.395 17.2081 179.325 15.4125 176.623 15.4125C173.667 15.4125 172.186 17.75 172.186 21.3381L172.175 32.8906Z" fill="white"/>
                <path d="M206.595 22.8153L202.868 23.5941C200.574 24.0542 199.148 24.6152 199.148 26.4034C199.148 27.7326 200.167 28.5465 201.75 28.5465C204.471 28.5465 206.595 26.5054 206.595 23.2871V22.8153ZM213.836 26.7115C213.836 27.8803 214.344 28.3945 215.262 28.3945C215.912 28.4126 216.558 28.2798 217.148 28.0046V31.9401C215.761 32.959 214.072 33.4807 212.353 33.4212C209.651 33.4212 207.663 31.9911 207.002 29.439C205.727 32.0421 202.924 33.4212 199.404 33.4212C194.866 33.4212 192.016 31.122 192.016 27.2417C192.016 22.8971 195.278 21.058 200.275 20.0879L206.598 18.9616V18.5728C206.598 16.4255 205.525 15.1473 203.281 15.1473C201.139 15.1473 200.07 16.4765 199.66 18.3656L192.836 17.8205C193.614 12.966 197.223 9.5957 203.697 9.5957C209.612 9.5957 213.847 12.253 213.847 18.4325L213.836 26.7115Z" fill="white"/>
                <path d="M237.079 17.4111C235.895 16.7459 234.547 16.4272 233.189 16.492C230.129 16.492 228.092 18.2292 228.092 22.1647V32.8906H220.766V10.2073H228.108V14.3447C228.974 11.7926 231.32 9.59531 234.38 9.59531C235.757 9.59531 236.927 10.0044 237.537 10.5144L237.079 17.4111Z" fill="white"/>
                <path d="M248.608 32.8906H241.266V0.7075H248.608V18.5872L257.162 10.2062H265.885L256.358 19.1993L266.247 32.8906H257.936L250.847 23.2867L248.608 25.4839V32.8906Z" fill="white"/>
                <path d="M280.461 10.2079H272.734V17.9492H280.461V10.2079Z" fill="#EF353F"/>
                <path d="M272.734 22.1846H280.461C280.461 30.6198 280.461 36.2383 272.734 36.2383C274.796 34.1728 272.734 29.2832 272.734 29.2832C274.87 29.0377 275.554 29.926 275.554 29.926C275.554 27.6745 272.734 27.6586 272.734 27.6586V22.1846Z" fill="#EF353F"/>
                <path d="M1.61017 50.4064C1.14503 50.1981 0.782072 49.9091 0.518102 49.5394C0.254133 49.1696 0.11789 48.7425 0.109375 48.258H1.34833C1.38984 48.6745 1.56334 49.0251 1.86563 49.3099C2.16685 49.5946 2.60751 49.737 3.1876 49.737C3.74002 49.737 4.17749 49.5989 4.49681 49.3216C4.81612 49.0464 4.97578 48.6915 4.97578 48.258C4.97578 47.918 4.88212 47.6418 4.69478 47.4293C4.50745 47.2168 4.27328 47.0553 3.99228 46.9448C3.71128 46.8343 3.33236 46.7153 2.85551 46.5878C2.26797 46.4348 1.7975 46.2818 1.44413 46.1288C1.09075 45.9758 0.788458 45.7356 0.537261 45.4084C0.286064 45.0811 0.160466 44.6413 0.160466 44.0888C0.160466 43.6043 0.282871 43.175 0.530875 42.801C0.777814 42.427 1.12481 42.138 1.57185 41.934C2.0189 41.73 2.53194 41.628 3.11097 41.628C3.94545 41.628 4.62879 41.8373 5.16099 42.2528C5.69212 42.6693 5.99334 43.2218 6.06147 43.9103H4.78419C4.74055 43.5703 4.56174 43.2706 4.24774 43.0114C3.93268 42.7521 3.51544 42.6225 2.99601 42.6225C2.51065 42.6225 2.11469 42.7479 1.80815 42.9986C1.5016 43.2494 1.34833 43.6 1.34833 44.0505C1.34833 44.3735 1.43987 44.637 1.62294 44.841C1.80602 45.045 2.03167 45.2001 2.2999 45.3064C2.56813 45.4126 2.94492 45.5338 3.43028 45.6698C4.01783 45.8313 4.49042 45.9906 4.84806 46.1479C5.20569 46.3051 5.51224 46.5474 5.76769 46.8746C6.02315 47.2019 6.15088 47.646 6.15088 48.207C6.15088 48.6405 6.03592 49.0485 5.80601 49.431C5.5761 49.8135 5.2355 50.1238 4.78419 50.3618C4.33289 50.5998 3.80069 50.7188 3.1876 50.7188C2.60006 50.7188 2.07425 50.6146 1.61017 50.4064Z" fill="#EF353F"/>
                <path d="M19.3258 49.278C19.824 48.9901 20.2157 48.5778 20.5009 48.0423C20.7862 47.5058 20.9288 46.8863 20.9288 46.1798C20.9288 45.4658 20.7862 44.8431 20.5009 44.3119C20.2157 43.7806 19.8261 43.3705 19.3322 43.0826C18.8384 42.7925 18.2764 42.6491 17.6462 42.6491C17.0161 42.6491 16.4541 42.7925 15.9602 43.0826C15.4664 43.3705 15.0768 43.7806 14.7915 44.3119C14.5063 44.8431 14.3636 45.4658 14.3636 46.1798C14.3636 46.8863 14.5063 47.5058 14.7915 48.0423C15.0768 48.5778 15.4685 48.9901 15.9666 49.278C16.4648 49.567 17.0246 49.7115 17.6462 49.7115C18.2678 49.7115 18.8277 49.567 19.3258 49.278ZM15.3855 50.1397C14.7043 49.7519 14.1657 49.2121 13.7697 48.5194C13.3738 47.8277 13.1758 47.0468 13.1758 46.1798C13.1758 45.3138 13.3738 44.5329 13.7697 43.8412C14.1657 43.1474 14.7043 42.6087 15.3855 42.2209C16.0667 41.8341 16.8203 41.6418 17.6462 41.6418C18.4807 41.6418 19.2386 41.8341 19.9198 42.2209C20.601 42.6087 21.1374 43.1463 21.5291 43.8338C21.9208 44.5223 22.1167 45.3053 22.1167 46.1798C22.1167 47.0553 21.9208 47.8383 21.5291 48.5258C21.1374 49.2143 20.601 49.7519 19.9198 50.1397C19.2386 50.5264 18.4807 50.7188 17.6462 50.7188C16.8203 50.7188 16.0667 50.5264 15.3855 50.1397Z" fill="#EF353F"/>
                <path d="M34.4309 41.7422V42.6867H30.5608V45.6819H33.7028V46.6265H30.5608V50.6289H29.3984V41.7422H34.4309Z" fill="#EF353F"/>
                <path d="M47.06 41.7422V42.6867H44.6332V50.6289H43.4708V42.6867H41.0312V41.7422H47.06Z" fill="#EF353F"/>
                <path d="M65.4294 41.7411L62.8493 50.6279H61.5465L59.4773 43.4751L57.3315 50.6279L56.0415 50.6406L53.5508 41.7411H54.7897L56.7312 49.2764L58.877 41.7411H60.1798L62.2235 49.2509L64.1777 41.7411H65.4294Z" fill="#EF353F"/>
                <path d="M77.3829 47.7092L75.7735 43.2212L74.1642 47.7092H77.3829ZM77.715 48.6527H73.8321L73.1168 50.6289H71.8906L75.1094 41.7932H76.4505L79.6564 50.6289H78.4303L77.715 48.6527Z" fill="#EF353F"/>
                <path d="M87.9709 46.0644H89.6825C90.3126 46.0644 90.7852 45.9093 91.1002 45.599C91.4153 45.2888 91.5728 44.8744 91.5728 44.3559C91.5728 43.8289 91.4174 43.4209 91.1066 43.1319C90.7958 42.8429 90.3211 42.6984 89.6825 42.6984H87.9709V46.0644ZM91.4962 50.6289L89.3759 46.9952H87.9709V50.6289H86.8086V41.7422H89.6825C90.3552 41.7422 90.9235 41.8569 91.3876 42.0864C91.8517 42.3159 92.1987 42.6262 92.4286 43.0172C92.6585 43.4082 92.7735 43.8544 92.7735 44.3559C92.7735 44.9679 92.5968 45.5077 92.2434 45.9752C91.89 46.4427 91.3599 46.7518 90.6532 46.9059L92.8884 50.6289H91.4962Z" fill="#EF353F"/>
                <path d="M101.487 42.6857V45.6564H104.731V46.6116H101.487V49.6716H105.114V50.6289H100.324V41.7294H105.114V42.6857H101.487Z" fill="#EF353F"/>
                <path d="M127.184 48.761C127.789 48.1533 128.091 47.3012 128.091 46.2047C128.091 45.0997 127.787 44.2369 127.178 43.6164C126.569 42.9959 125.694 42.6857 124.553 42.6857H122.944V49.6716H124.553C125.702 49.6716 126.58 49.3688 127.184 48.761ZM127.076 42.284C127.787 42.6453 128.332 43.1606 128.71 43.8321C129.089 44.5047 129.279 45.2952 129.279 46.2047C129.279 47.1142 129.089 47.9015 128.71 48.5687C128.332 49.237 127.787 49.747 127.076 50.0998C126.365 50.4525 125.524 50.6289 124.553 50.6289H121.781V41.7422H124.553C125.524 41.7422 126.365 41.9217 127.076 42.284Z" fill="#EF353F"/>
                <path d="M137.721 42.6857V45.6564H140.965V46.6116H137.721V49.6716H141.348V50.6289H136.559V41.7294H141.348V42.6857H137.721Z" fill="#EF353F"/>
                <path d="M156.216 41.7422L152.857 50.6289H151.515L148.156 41.7422H149.395L152.192 49.4049L154.99 41.7422H156.216Z" fill="#EF353F"/>
                <path d="M164.405 42.6857V45.6564H167.649V46.6116H164.405V49.6716H168.032V50.6289H163.242V41.7294H168.032V42.6857H164.405Z" fill="#EF353F"/>
                <path d="M176.705 49.6854H179.822V50.6289H175.543V41.7411H176.705V49.6854Z" fill="#EF353F"/>
                <path d="M192.521 49.278C193.019 48.9901 193.411 48.5778 193.696 48.0423C193.982 47.5058 194.124 46.8863 194.124 46.1798C194.124 45.4658 193.982 44.8431 193.696 44.3119C193.411 43.7806 193.021 43.3705 192.528 43.0826C192.034 42.7925 191.472 42.6491 190.842 42.6491C190.211 42.6491 189.649 42.7925 189.156 43.0826C188.662 43.3705 188.272 43.7806 187.987 44.3119C187.702 44.8431 187.559 45.4658 187.559 46.1798C187.559 46.8863 187.702 47.5058 187.987 48.0423C188.272 48.5778 188.664 48.9901 189.162 49.278C189.66 49.567 190.22 49.7115 190.842 49.7115C191.463 49.7115 192.023 49.567 192.521 49.278ZM188.581 50.1397C187.9 49.7519 187.361 49.2121 186.965 48.5194C186.569 47.8277 186.371 47.0468 186.371 46.1798C186.371 45.3138 186.569 44.5329 186.965 43.8412C187.361 43.1474 187.9 42.6087 188.581 42.2209C189.262 41.8341 190.016 41.6418 190.842 41.6418C191.676 41.6418 192.434 41.8341 193.115 42.2209C193.796 42.6087 194.333 43.1463 194.724 43.8338C195.116 44.5223 195.312 45.3053 195.312 46.1798C195.312 47.0553 195.116 47.8383 194.724 48.5258C194.333 49.2143 193.796 49.7519 193.115 50.1397C192.434 50.5264 191.676 50.7188 190.842 50.7188C190.016 50.7188 189.262 50.5264 188.581 50.1397Z" fill="#EF353F"/>
                <path d="M206.898 45.5417C207.205 45.2612 207.358 44.8617 207.358 44.3432C207.358 43.2467 206.728 42.6984 205.468 42.6984H203.756V45.9624H205.468C206.115 45.9624 206.592 45.8222 206.898 45.5417ZM207.786 46.1855C207.279 46.6743 206.506 46.9187 205.468 46.9187H203.756V50.6289H202.594V41.7422H205.468C206.472 41.7422 207.237 41.9844 207.76 42.4689C208.284 42.9534 208.546 43.5782 208.546 44.3432C208.546 45.0827 208.293 45.6968 207.786 46.1855Z" fill="#EF353F"/>
                <path d="M224.769 41.8059V50.6289H223.606V44.0488L220.669 50.6289H219.851L216.901 44.0372V50.6289H215.738V41.8059H216.99L220.26 49.0978L223.53 41.8059H224.769Z" fill="#EF353F"/>
                <path d="M233.643 42.6857V45.6564H236.887V46.6116H233.643V49.6716H237.27V50.6289H232.48V41.7294H237.27V42.6857H233.643Z" fill="#EF353F"/>
                <path d="M251.781 50.6289H250.618L245.944 43.5527V50.6289H244.781V41.7294H245.944L250.618 48.7929V41.7294H251.781V50.6289Z" fill="#EF353F"/>
                <path d="M264.986 41.7422V42.6867H262.559V50.6289H261.397V42.6867H258.957V41.7422H264.986Z" fill="#EF353F"/>
                </svg>
                
            </div>

            <div class="header-title">
              <input type="text"  placeholder="Policy Title"  *ngIf="!toggleInputList['header_563298'] && (isCreate || isEdit)" [value]="policyData['header_563298'] || ''"  (input)="onInputChange($event , 'header_563298')" class="w-full focus:outline-none">
              <span *ngIf="toggleInputList['header_563298'] && (isCreate || isEdit)" class="fw-bold header-Text text-white">{{ policyData['header_563298'] || 'Policy Title'}}</span>
              <div class="button header-edit-btn">
                <button  *ngIf="isCreate || isEdit"
                    mat-flat-button
                    color="primary"
                    class="btn-icon btn-md-icon"
                    (click)="onToggleChange('header_563298')"
                >
                  <mat-icon> {{!toggleInputList['header_563298'] ?  'edit' : 'check'}}</mat-icon>
                </button>
              </div>
              <span  *ngIf="!(isCreate || isEdit)" class="fw-bold header-Text text-white">{{ policyData['header_563298'] || 'Title'}}</span>
            </div>
          </div>
          
          <div class="media-shark-icon">
              <div class="w-full h-full flex items-center justify-center rounded-lg ">
                  <label class="cursor-pointer flex flex-col items-center justify-center upload">
                    <svg width="93" height="321" viewBox="0 0 93 321" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M92.9994 0.00171661H0.0351562V95.4141H92.9994V0.00171661Z" fill="#EF353F"/>
                      <path d="M0 147.608H92.9642C92.9642 251.572 92.9642 320.82 0 320.82C24.8067 295.363 0 235.098 0 235.098C25.6903 232.073 33.9251 243.021 33.9251 243.021C33.9251 215.272 0 215.075 0 215.075V147.608Z" fill="#EF353F"/>
                      </svg>
                      
                  </label>
              </div>
          </div>
        </div>
        </div>`
  },
  {
    id : 'fullwidthimage_653985_element',
    template : `<!-- full-width-image -->
        <div class="cmn-single-block-wrapper mt-5"  #fullwidthimage_653985_element cdkDrag>
          <div class="cmn-single-block-move-icon-box" *ngIf="isEdit || isCreate">
            <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
          </div>
          <div
            class="cmn-middle-block"
            [ngClass]="{
              'cmn-full-width-block-wrapper': true,
              ' cmn-block-shadow cmn-block-border': isEdit || isCreate,
              'flex-grow-none':getImage('fullwidthimage_653985')
            }"
          >
            <div class="cmn-full-width-block-inner">
                <div class="user-added-image">
                  <img
                    *ngIf="!(isEdit || isCreate)"
                    [src]="getImage('fullwidthimage_653985') || '../../../../../../assets/img/illustrations/Image_Attachment.svg'"
                    alt="desktop-mobile"
                    class="cover-image policy-header-image"/>
      
                  <img
                     *ngIf="(isEdit || isCreate) && getImage('fullwidthimage_653985')"
                      [src]="getImage('fullwidthimage_653985')"
                     alt="desktop-mobile"
                      class="cover-image"/>
      
                   <div class="edit-image-wrapper" *ngIf="(isEdit || isCreate) && !getImage('fullwidthimage_653985')">
                    <div class="edit-image-container">
                      <img
                        (click)="addImage('fullwidthimage_653985')"
                        [src]="'../../../../../../assets/img/illustrations/Image_Attachment.svg'"
                        alt="desktop-mobile"
                        class="edit-image"/>
                      <label class="text-[#8e8e8e] font-bold text-[15px] mt-[10px]">Click to Upload Image</label>
                    </div>
                  </div>
                </div>
            </div>
            
            <div class="edit-img-circle" (click)="addImage('fullwidthimage_653985')"  *ngIf="(isEdit || isCreate) && getImage('fullwidthimage_653985')">
                <img src="../../../../../../assets/img/illustrations/Image_Attachment.svg" alt="edit icon"/>
             </div>
          </div>
          <div class="cmn-single-block-delete-icon-box"  *ngIf="isEdit || isCreate">
            <div class="button">
              <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('fullwidthimage_653985_element')">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
        </div>`
  },
  {
    id : 'redHeader_326958_element',
    template : `<div class="row" cdkDrag #redHeader_326958_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_326958']">{{ policyData['redHeader_326958'] ?? 'PURPOSE' || policyData['redHeader_326958'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_326958']">
                          <input
                             (input)="onInputChange($event , 'redHeader_326958')"
                            placeholder="Enter your title"
                            [value]="policyData['redHeader_326958'] ?? 'PURPOSE' || policyData['redHeader_326958']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ policyData['redHeader_326958'] ?? 'PURPOSE' || policyData['redHeader_326958'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_326958')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_326958'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_326958_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_993325_element',
    template : `<div class="row" cdkDrag #RichTextBox_993325_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description"  (input)="onInputChange($event , 'RichTextBox_993325')"  [value]="policyData['RichTextBox_993325']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(policyData['RichTextBox_993325'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('RichTextBox_993325_element')" >
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'redHeader_565396_element',
    template : `<div class="row" cdkDrag #redHeader_565396_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_565396']">{{ policyData['redHeader_565396'] ?? 'ELIGIBILITY' || policyData['redHeader_565396'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_565396']">
                          <input
                             (input)="onInputChange($event , 'redHeader_565396')"
                            placeholder="Enter your title"
                            [value]="policyData['redHeader_565396'] ?? 'ELIGIBILITY' || policyData['redHeader_565396']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ policyData['redHeader_565396'] ?? 'ELIGIBILITY' || policyData['redHeader_565396'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_565396')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_565396'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_565396_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_996905_element',
    template : `<div class="row" cdkDrag #RichTextBox_996905_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description"  (input)="onInputChange($event , 'RichTextBox_996905')"  [value]="policyData['RichTextBox_996905']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(policyData['RichTextBox_996905'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('RichTextBox_996905_element')" >
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'redHeader_562369_element',
    template : `<div class="row" cdkDrag #redHeader_562369_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_562369']">{{ policyData['redHeader_562369'] ?? 'DESIGNATED WORKSPACE' || policyData['redHeader_562369'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_562369']">
                          <input
                             (input)="onInputChange($event , 'redHeader_562369')"
                            placeholder="Enter your title"
                            [value]="policyData['redHeader_562369'] ?? 'DESIGNATED WORKSPACE' || policyData['redHeader_562369']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ policyData['redHeader_562369'] ?? 'DESIGNATED WORKSPACE' || policyData['redHeader_562369'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_562369')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_562369'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_562369_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_336595_element',
    template : `<div class="row" cdkDrag #RichTextBox_336595_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description"  (input)="onInputChange($event , 'RichTextBox_336595')"  [value]="policyData['RichTextBox_336595']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(policyData['RichTextBox_336595'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('RichTextBox_336595_element')" >
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'image_textarea_563001_element',
    template : `       <div class="row" cdkDrag #image_textarea_563001_element>
      <div class="col-4 cmn-single-block-wrapper">
        <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
          <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
        </div>
        <div class="single-image-template-1">
          <div class="w-full h-full flex items-center justify-center rounded-lg bg-white" [ngClass]="{ 'border-2 border-dashed border-gray-400 ': isEdit || isCreate }">
            <label class="cursor-pointer flex flex-col items-center justify-center upload">
              <img  *ngIf="!(isEdit || isCreate)" [src]="getImage('twoimages_563001') || '../../../../../../assets/img/illustrations/Image_Attachment.svg'" alt="Upload Image"  class="cover-image">
              <img
              *ngIf="(isEdit || isCreate) && getImage('twoimages_563001')"
              class="cover-image"
              [src]="getImage('twoimages_563001')"
              alt="desktop-mobile" />
              <div class="edit-image-wrapper" *ngIf="(isEdit || isCreate) && !getImage('twoimages_563001')">
                <div class="edit-image-container">
                  <img
                    (click)="addImage('twoimages_563001')"
                    [src]="'../../../../../../assets/img/illustrations/Image_Attachment.svg'"
                    alt="desktop-mobile"
                    class="edit-image"/>
                  <label class="text-[#8e8e8e] font-bold text-[15px] mt-[10px]">Click to Upload Image</label>
                </div>
              </div>
  
              <div class="edit-img-circle" (click)="addImage('twoimages_563001')"  *ngIf="(isEdit || isCreate) && getImage('twoimages_563001')">
                <img src="../../../../../../assets/img/illustrations/Image_Attachment.svg" alt="edit icon"/>
              </div>
            </label>
        </div>
        </div>
        
      </div>
        <div class="col-8">
          <div class="cmn-single-block-wrapper">
            <div>
              <div
              class="cmn-middle-block"
              [ngClass]="{ 'cmn-header-block-wrapper': true }"
            >
              <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_898653']">{{ policyData['redHeader_898653'] ?? 'REMOTE MEETINGS' || policyData['redHeader_898653'] }}</h2>
                <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_898653']">
                  <input
                     (input)="onInputChange($event , 'redHeader_898653')"
                    placeholder="Enter your title"
                    [value]="policyData['redHeader_898653'] ?? 'REMOTE MEETINGS' || policyData['redHeader_898653']"
                  />
                </div>
              </div>
               <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                <h2 class="red-Title-template-1">{{ policyData['redHeader_898653'] ?? 'REMOTE MEETINGS' || policyData['redHeader_898653'] }}</h2>
              </div>
              <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                <button
                  mat-flat-button
                  color="primary"
                  class="btn-icon btn-md-icon"
                  (click)="onToggleChange('redHeader_898653')"
                >
                  <mat-icon> {{ !toggleInputList['redHeader_898653'] ?  'edit' : 'check'}}</mat-icon>
                </button>
              </div>
            </div>
           <div class="input-outline flex-grow">
              <div
               [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                class="w-full cmn-text-block-inner"
                  *ngIf="isEdit || isCreate"
              >
                <textarea placeholder="Enter your description" (input)="onInputChange($event , 'RichTextBox_563565')"  [value]="policyData['RichTextBox_563565']?.trim() || ''"  class="w-full"  rows="3" cols="2">
                </textarea>
              </div>
                <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                  <span [innerHTML]=" getTextArea(policyData['RichTextBox_563565'])"></span> 
               </p>
           </div>
           <div
              class="cmn-middle-block"
              [ngClass]="{ 'cmn-header-block-wrapper': true }"
            >
              <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_111235']">{{ policyData['redHeader_111235'] ?? 'RULES AND POLICIES' || policyData['redHeader_111235'] }}</h2>
                <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_111235']">
                  <input
                     (input)="onInputChange($event , 'redHeader_111235')"
                    placeholder="Enter your title"
                    [value]="policyData['redHeader_111235'] ?? 'RULES AND POLICIES' || policyData['redHeader_111235']"
                  />
                </div>
              </div>
               <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                <h2 class="red-Title-template-1">{{ policyData['redHeader_111235'] ?? 'RULES AND POLICIES' || policyData['redHeader_111235'] }}</h2>
              </div>
              <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                <button
                  mat-flat-button
                  color="primary"
                  class="btn-icon btn-md-icon"
                  (click)="onToggleChange('redHeader_111235')"
                >
                  <mat-icon> {{ !toggleInputList['redHeader_111235'] ?  'edit' : 'check'}}</mat-icon>
                </button>
              </div>
            </div>
           <div class="input-outline flex-grow">
              <div
               [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                class="w-full cmn-text-block-inner"
                  *ngIf="isEdit || isCreate"
              >
                <textarea placeholder="Enter your description" (input)="onInputChange($event , 'RichTextBox_222303')"  [value]="policyData['RichTextBox_222303']?.trim() || ''"  class="w-full"  rows="3" cols="2">
                </textarea>
              </div>
                <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                  <span [innerHTML]=" getTextArea(policyData['RichTextBox_222303'])"></span> 
               </p>
            </div>
            </div>
           
            <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
              <div class="button">
                <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('image_textarea_563001_element')">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>`
  },
  {
    id : 'redHeader_645350_element',
    template : `<div class="row" cdkDrag #redHeader_645350_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_645350']">{{ policyData['redHeader_645350'] ?? 'DESIGNATED WORK TIME' || policyData['redHeader_645350'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_645350']">
                          <input
                             (input)="onInputChange($event , 'redHeader_645350')"
                            placeholder="Enter your title"
                            [value]="policyData['redHeader_645350'] ?? 'DESIGNATED WORK TIME' || policyData['redHeader_645350']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ policyData['redHeader_645350'] ?? 'DESIGNATED WORK TIME' || policyData['redHeader_645350'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_645350')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_645350'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_645350_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_123989_element',
    template : `<div class="row" cdkDrag #RichTextBox_123989_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description"  (input)="onInputChange($event , 'RichTextBox_123989')"  [value]="policyData['RichTextBox_123989']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(policyData['RichTextBox_123989'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('RichTextBox_123989_element')" >
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'redHeader_112365_element',
    template : `<div class="row" cdkDrag #redHeader_112365_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_112365']">{{ policyData['redHeader_112365'] ?? 'TIME KEEPING' || policyData['redHeader_112365'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_112365']">
                          <input
                             (input)="onInputChange($event , 'redHeader_112365')"
                            placeholder="Enter your title"
                            [value]="policyData['redHeader_112365'] ?? 'TIME KEEPING' || policyData['redHeader_112365']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ policyData['redHeader_112365'] ?? 'TIME KEEPING' || policyData['redHeader_112365'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_112365')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_112365'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_112365_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_366653_element',
    template : `<div class="row" cdkDrag #RichTextBox_366653_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description"  (input)="onInputChange($event , 'RichTextBox_366653')"  [value]="policyData['RichTextBox_366653']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(policyData['RichTextBox_366653'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('RichTextBox_366653_element')" >
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'redHeader_778569_element',
    template : `<div class="row" cdkDrag #redHeader_778569_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_778569']">{{policyData['redHeader_778569'] ?? 'MEAL AND REST BREAKS' || policyData['redHeader_778569'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_778569']">
                          <input
                             (input)="onInputChange($event , 'redHeader_778569')"
                            placeholder="Enter your title"
                            [value]="policyData['redHeader_778569'] ?? 'MEAL AND REST BREAKS' || policyData['redHeader_778569']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ policyData['redHeader_778569'] ?? 'MEAL AND REST BREAKS' || policyData['redHeader_778569'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_778569')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_778569'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_778569_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_3967754_element',
    template : `<div class="row" cdkDrag #RichTextBox_3967754_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description"  (input)="onInputChange($event , 'RichTextBox_3967754')"  [value]="policyData['RichTextBox_3967754']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(policyData['RichTextBox_3967754'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('RichTextBox_3967754_element')" >
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'redHeader_788856_element',
    template : `<div class="row" cdkDrag #redHeader_788856_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_788856']">{{ policyData['redHeader_788856'] ?? 'CONFIDENTIALITY AND SECURITY' || policyData['redHeader_788856'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_788856']">
                          <input
                             (input)="onInputChange($event , 'redHeader_788856')"
                            placeholder="Enter your title"
                            [value]="policyData['redHeader_788856'] ?? 'CONFIDENTIALITY AND SECURITY' || policyData['redHeader_788856']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ policyData['redHeader_788856'] ?? 'CONFIDENTIALITY AND SECURITY' || policyData['redHeader_788856'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_788856')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_788856'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_788856_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_565953_element',
    template : `<div class="row" cdkDrag #RichTextBox_565953_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description"  (input)="onInputChange($event , 'RichTextBox_565953')"  [value]="policyData['RichTextBox_565953']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(policyData['RichTextBox_565953'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('RichTextBox_565953_element')" >
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'footer',
    template : `            <!-- footer -->
        <div class="row mt-5 w-full footer-bg-template-1" #footer >
          <div class="col-12">
            <svg width="100%" height="140" viewBox="0 0 1140 140" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <rect x="0.519531" y="0.976562" width="1138.96" height="139" fill="url(#pattern0_1859_2192)"/>
              <defs>
              <pattern id="pattern0_1859_2192" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_1859_2192" transform="matrix(0.000443262 0 0 0.00363209 0 -0.00486025)"/>
              </pattern>
              <image id="image0_1859_2192" width="2256" height="278" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACNAAAAEWCAYAAACtofgsAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAKN3SURBVHgB7L0JlGVXdZ9/ah66elJrFiAJgZglRgkQgwRisBDzDDbEAf5gx4bYiZdXkuWQrOWYlThZjhPj4NhMJpjZgAwIJAwIxCSQQQgkoQHNYw/qqbrmqv/5TvduXz1V1bvv1dDV/b4Pnqq63nv3nvnes/fv7p2SiIiIiIiIiIiIiIiIiIiIiEgH05Vf5yYRERERERERERERERERERERkQ4FAc1cEhERERERERERERERERERERHpULqTiIiIiIiIiIiIiIiIiIiIiEgHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6GgU0IiIiIiIiIiIiIiIiIiIiItLRKKARERERERERERERERERERERkY5GAY2IiIiIiIiIiIiIiIiIiIiIdDQKaERERERERERERERERERERESko1FAIyIiIiIiIiIiIiIiIiIiIiIdjQIaEREREREREREREREREREREeloFNCIiIiIiIiIiIiIiIiIiIiISEejgEZEREREREREREREREREREREOhoFNCIiIiIiIiIiIiIiIiIiIiLS0SigEREREREREREREREREREREZGORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHY0CGhERERERERERERERERERERHpaBTQiIiIiIiIiIiIiIiIiIiIiEhHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6GgU0IiIiIiIiIiIiIiIiIiIiItLRKKARERERERERERERERERERERkY5GAY2IiIiIiIiIiIiIiIiIiIiIdDQKaERERERERERERERERERERESko1FAIyIiIiIiIiIiIiIiIiIiIiIdjQIaEREREREREREREREREREREeloFNCIiIiIiIiIiIiIiIiIiIiISEejgEZEREREREREREREREREREREOhoFNCIiIiIiIiIiIiIiIiIiIiLS0SigEREREREREREREREREREREZGORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHY0CGhERERERERERERERERERERHpaBTQiIiIiIiIiIiIiIiIiIiIiEhHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6GgU0IiIiIiIiIiIiIiIiIiIiItLRKKARERERERERERERERERERERkY5GAY2IiIiIiIiIiIiIiIiIiIiIdDQKaERERERERERERERERERERESko1FAIyIiIiIiIiIiIiIiIiIiIiIdjQIaEREREREREREREREREREREeloFNCIiIiIiIiIiIiIiIiIiIiISEejgEZEREREREREREREREREREREOhoFNCIiIiIiIiIiIiIiIiIiIiLS0SigEREREREREREREREREREREZGORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHY0CGhERERERERERERERERERERHpaBTQiIiIiIiIiIiIiIiIiIiIiEhHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6GgU0IiIiIiIiIiIiIiIiIiIiItLRKKARERERERERERERERERERERkY5GAY2IiIiIiIiIiIiIiIiIiIiIdDQKaERERERERERERERERERERESko1FAIyIiIiIiIiIiIiIiIiIiIiIdjQIaEREREREREREREREREREREeloFNCIiIiIiIiIiIiIiIiIiIiISEejgEZEREREREREREREREREREREOhoFNCIiIiIiIiIiIiIiIiIiIiLS0SigEREREREREREREREREREREZGORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHY0CGhERERERERERERERERERERHpaBTQiIiIiIiIiIiIiIiIiIiIiEhHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6Wh6k4iIHJacffbZ6fGPf3zavHlz08/Ozs6mbdu2pe9+97tp69ataffu3fN+rqenJz3sYQ9Lz3/+89OmTZtSHfbu3Ztuv/329P3vfz/t2rUrzczMJFl9hoeHy3h4znOeU/s71157bbr++uvTzTffnKanp5Mc/rAenHjiiemcc84pY6K3t/mt3q233lpeV1xxRRIREREREREREREREelUFNCIiBymPO5xj0svetGL0sMf/vCmn0UcceONN6a77rorjY2NLSigwdl+/PHHFwHNIx/5yFSH7du3F8f7DTfcsOBxZeUZGBhIp512WnrDG95Q+zuXXnppGQ8IoBTQHBkgmjn11FPTi1/84nTsscemwcHBpt/54Q9/WF4KaEREREREREREREREpJNRQCMicphClAlENI997GObfnZycjL19/eX6BQILRaiu7s7bdy4sRzzjDPOSHW49957S1QbHPd8Xw4NfX196YQTTkhPecpTan8HURWRhuy3I4ehoaG0ZcuWEo3opJNOKvOyGTt27CgRaERERERERERERERERDoZPWYiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6mt4kIiJSYc+ePenGG29MXV1dtT6/ffv2dMcdd6SxsbE0NzeXREREREREREREREREREQONxTQiIjIQSYnJ9P111+f/tf/+l9pw4YNtb4zMTGRtm3blu6+++40PT2dREREREREREREREREREQONxTQiIjIQWZnZ9POnTvTVVddlXp6emp9h6gzCG+MQCMiIiIiIiIiIiIiIiIihysKaESOAAYGBlJfX195VdPuTE1NleggMzMz5dUuHLO7uzsNDQ0VUUVvb2/5G2ILIo4gnuDFvw8l1XagnJSZctIOlJM2oJz8fqiFHrQh5RwcHDxYTl7RnpSZn6sN7cK5EdGsBWgb+pK+pc34Nz+BstJe8RofH18TAh76tb+/v7wa02BRPsZhtbxrXXREHRinMWaDGCusMYdqTsXaRPlibYpxApSLdYm5RHvT9oeLyIs6MIZYd6kT5aYuCNViTRMREREREREREREREZHlQwGNyGEODuR169al9evXl5Q71aghu3fvLkKI0dHRJQlocOTiOD/66KOLo3p4eLj8G6f0vn370o4dO9KuXbuKU/dQOqdHRkZKW2zcuLGUMUQ0tANOfsp6//33Fyf0UtpjOaAdKS9tioM8HP70FeXldSgENGsNxjfimWOPPba0UwgKgH7cu3dv6VdeIaQ51AIJyrdp06YyH6uCEwhxFOUm7dVaKO9ihLBr8+bNZW4xZiGEQHv27ClzivocqjlFG8ecZx2knCFKQ2zCi/Lde++9BwV0hwOsX9TppJNOKnVivDN27rzzzrJOKKARERERERERERERERFZXhTQiKwiONRPO+204hBtdKzPRzjZb7nlluKkBpzCiAhOPfXU9NjHPjY9+9nPLsfDcYwooxrxAscx39u+fXv6+c9/nr72ta8VJzJ/bwbHQtxx3nnnpVNOOSU9+tGPLk70iK6BczcECzhz77rrrnTTTTelK6+8Mv34xz8ugpWVFIDgIMeZf+aZZ5a2eOITn5ge9rCHFYczAgbKGU50Ik9EZBfq/stf/jL96le/Stdee20p61Ij9NSFsj784Q9PT33qU9NDH/rQ0mc4/quRgygj7YkoiTJ+73vfKz8ZA6tRRvqVfn784x9fyhfRXhYDEcWtt96abr/99tLWSyHEYPTnU57ylHT88cenE0444WBZ4gWROgpRAf1Km914443pjjvuSNdff3264oorVjzCC+21ZcuW9PSnP72Mw5NPPjmdeOKJZWyGiKtKRJ9hfjAXmZu33XZbuuyyy8pc37p16yEXd8UYeMITnlDG61lnnVX6gDUBMRNEu9LuUYef/exn6Zvf/GYR01G/lSob84UyPeIRjyhtzTpIe1M2yhiRf3iFYIbyUK677767lJU1gPHB2F3qmA0e9ahHpWOOOaasm9AYfahKjIMf/ehHDygDZT/qqKPS85///PS4xz2ujCnmQFwv+B6iyBtuuCH95Cc/SV/4whcORgA6FNDmXBuoN32wWJ0boT+YA8xZ+mmxedp14PWUdSNpY09fGuiul14Ofrx3VxqdnUl7D3GENBERERERERERERERWfsooBFZRXAwIp5A9IKjtxk403FKI6TBaUpUC5ypz3zmM4vzGOc2TltEGDheI7USRIQIInPg5ObzCEwQYyAawQEb6Z0Cvov45PTTTy+ffdrTnpbOOOOM4hyNCCDV1EjVdDQcn7Lg9KVcnIdzIKxZDhFDOMRpgxAh4eBHsED5KC+O52oKl2gLyhhRZygr37nvvvuKM/3JT35yuvnmm0tZcawjxlguAQPloEy86HdEIQ95yENK+yBQwPkcYqSAc1MG+u2Rj3xk6QuESTj8v/71rxdxDa+VEoXQbrRnCKci2sti4AS/9NJLyxhlTLVatkh3xNhhDNFG/E6fMrYRnvE+ZYsXxPiLVGIxzhGN0b+MD/qUsYjAJ9L5LIVIGUS5EEEh4Dj77LNLXx133HFFTFOdj1HWgPNXo7eEWOoxj3lMme+U81vf+lYRFzDvGQurBeOROiGWYY1inlEnxit9UE2fFXWJNYZ+ow6MGepwzTXXFIHackR7CtEMbc18CBEaaxLziDUx2ru6PkUZowyIVIjsxPjg+0960pPK+KCclHepadMoG+sJ7dDY742E8BBhXAh8qA9iIIRjz3rWs0p9GU9cN6pjns9SZ977xS9+UerAGFpNaGeEQvT3q1/96vJ7RCdaDMpPPzDWv//975c1uO6cpAXOWb8xPax/sIho6nL35Hi6e2oy7Z01opeIiIiIiIiIiIiIiCyOAhqRVYToGghSLrjgghJRoxk4onGcXnXVVUUEgLOYp/3f/OY3F+c2TtT5nPRVQryCg5uoIggxcBQjbGkUi3AcomYQKQXxzKte9aoi/sBZymux6AI4QREvRLSKyy+/vAgaEFcsR3SEEC7gNKZsOMAvvPDC0qZV0cxihLADgUY41TkW0T8A0cVypnfC6Y9TnHb59V//9dL3EcUnyjpfm0af0cc45EnZgoOfKEK0J4KFlRLQRESVc845pwh+6ozTiJDDOA1hVV0iRRPOd6K4INxBPIOQo1EItRhxTsQVIVChvRmHCI/uueeeg2KKpUB5aCPmBe3D641vfGNpJ/q1Ok+alTv6mbIimCACDZFzaEvmfkTXWS0Q9dF+CEve9ra3HUwvVhXmzQd1oF1ZNxCAEBmFtkD4RR2WQ0BDOZhH559/fjr33HPLGIm2brY2VcsZZY02Z8xefPHFpb0RtCwlDR1t94xnPKOIj5qViXZBcPaxj32siF/4LOs58w5BCu3YKAaqgpCQOYNwC0HQoRDQIK5i/L/2ta8t5eHa0QzaHXEY6xnRyuIa1KzNaQFWzKeMrE+PHxxJx/b2p7p8dsd9afchjuokIiIiIiIiIiIiIiKHBwpoRFYRHKE4oyPiRjNwQsfrJS95SRHevOxlLysClVbOGeIThCM4aYlwgBDnq1/9aokCgBMToQeihXe/+93pRS96UXGOtgLHj3rxfZzwL3zhC9P73ve+EkUHEUi74ChGAMTr3/ybf3Mw2kwzwUwj4YgOQRDtisiCiBFveMMbSjqUb3zjGyVCD6KQdsUWIej5nd/5neLwR7hENIlWylktK2lceNHvl1xySbroootK6pdW618XjhupuuqO0xAM1E3hEmOS9n/xi1+cnve855W0NfFeq8R3IkJKpPmhb1/60peWvqXtEHeQcqgdODbCBo757/7dvytRkBBENaZpaqXM0Q6Ul/nHMSn3d7/73fSd73wnffGLXyzRkVYyHRrCB8Qy73nPe4qAifrViZCVKvWIOcUcZayyVjHmSUFGXdqZSxyXNkHk9mu/9mtFMEd71xmTCx0v2pu+jPZmnXrBC15Q0k+R5g4RUzsimlhTIqpUs3HM5yKyDkKY//E//kf5nVedOUCbIvpZzZRfcQ1D5IOQibYjCk1diPbDmPibv/mbIqIhIlBL5+7Kc4VrTQtrX3fp9yQiIiIiIiIiIiIiItIUBTQiaxzEI6QcwrGNEIMn/ZcCjl0c5jg/iXhBRBMirxDRBWENzvs6kQSaQcoXHKsvf/nLS8oOzkXqkVYIZ/dznvOcEp0EsQXHrKY0WQ5wCBPJhogURLrASf/lL3+5RC1pR7hAfxE9BuEGYgKOtxTCmY5wiAgX1J0+q5MyZS1CfRgfiLRwxDPmEHR1rYCXGyEIKakQ54RQhXRT7URFIuoJ84YoIYgvlnscAm1AmRGxMBaJzvPhD3+4zB9SOi03jH0ip3Be6ka9aKOlHpOyI6RD3ME8QgTUCrQrIjmEM6TI4kWUn2oKqeUgBCFEzwHa+0Mf+lBp61bXq3ZgbWAesLazbrAO1RXP0LaNafhWmkjb9MpXvrKsccytOjDfSJVHNKhvf/vbJTrRarSviIiIiIiIiIiIiIhIKyigEVnD4ETGaYxjlSgMRIlpJTLEfOCcJfIBggWc9KR0wgGLAxcnNYKPpTrQgXJSXo75gx/8IF199dUtOUyjnIh5SGPEcXBy41RfbjgXDn+iQEQ0DdqF1CitpnSh3ogQKDPpTfj3crQnkFqJCB/0F5EyGBsrITpZaSJNFGOQfmUcEhlpJaDtN27cWCLHkDqGVDdEwCDyRd1+jcgllJfISgh+6o7DxnM06y/ep8xEi6J/6etvfetbRYCwEgIaxj3CLNqI+kX0lKXAuhXRhRBNEIEKwUSkUKoDZWAeMeeZS6Rvol2We7xH39LetDXz/Stf+Uq6++67V1TgEedlHCFKQcDInKgryIpUVMuRIqsujBXEPk94whPKHGDMIPhpVk7KR6Sc6667Ll1xxRUlddPWrVuTiIiIiIiIiIiIiIjIWkMBjcgaBuck4gKcuzi3ca4ulwOZyAdEtcF5/rnPfa5EesApSgSG5QJnPM7WV7ziFaXsRHaoC/UkugFpW97xjncUx+1ylm2+8xGJAhEN5yIqx7/9t/+2pHMigk5dEFgQdYdUWwgglhPakLLhyCblFKKCpQqqDgUIBogq9Lu/+7tlfNOvK5WOCiKqC2Id2u4Xv/hFiUKzb9++Wt9nHBNthnHIeEYYttIgICHa1LOf/ez0zne+s6SfIhJNO6mFFgNB1umnn17OR9ssJ6wxROuhbxFN1I3qQn8hJnnve99bIk/x+3JHnmkEcU5Ei7rjjjvSJz7xiSK2WkloF0R2CIWIftWKcCnEMzt37lzR9F4BfYKIkyhFv/Ebv1FEnXVgvJK+76qrrkp//Md/XFLjtZtCTUREREREREREREREZKVRQCOyhiHNDRFYcNjjXF1ukQFiDIQBCD1woi+3GCNSMCH0QFiCIAAnerP0OXwHMQ+RJ972treV6CR1HegR8YBIEjiZge/yquOg5ty0CcIOhDD8/o1vfKNpJBoc8Hz2ggsuKE7/E088Ma0ElI9+Ov/884vgYblFDytJjAfKjmArxtxqRdFBCIMYjfQzP//5z0uUkWYiGsqLsIJ0RJSXOdkMxgrRbhjrpF5CgMWYZ/wjFqLOHCdSEi00r+PvpO0aGxtLP/nJT8prOTnhhBMORkNZ7n6g/IilaDciyRDVCTFFs+8QDYt0cryIcrLS4pkg0tsh2rvllltKlBR+rtS5EEg+97nPPTguWiHWOcbWSkagoe0RFRFN6O1vf3vpm5NOOqnp9yJCDhFniPhExCwi0NQVrYmIiIiIiIiIiIiIiBwKFNCIrGEQZVTT/4RTkigOONRxnPI3nK98jp84Zus6whFf8B1eOI7DYc9xcfhzjqpwBIFIY5maEZFkiLKA45UIBIsJaCg/4gJSmvAiQkaz1C1RPiIbIFpAvECKnmgf6kaqFBzB4ZBf6HiRQocXEUtwol977bXF8b9QufkO5yCaD6IfRBqtipFC9IODuZqWBdEH/YOzPQRA/Ju2pG6HUwonyo1YgH4lpRLjqRmMd9qddFqkgUEwwN9oC9qGfkWIUmfc0++cHxEA45F2bubQZ47QnwjAGDucsxmM8euvvz7ddttt6dZbbz0ocgjRDMeh/2iDSOGzEMxJBGSIeIgA8tOf/rT8fbki0TBuq9C2vGhr2ifGWKQio/6tCPk4PuVHRMcc4rshbFvo87QLkVlolzrtTRmZ86xXe/bsKeOFv3Eu5jzHrM6fxaCe9DflZYyslIAm1hkiuSwmolqIENBEH60UrGkhIEPIRTSgOqI9+oK1E+HMP/3TP5UUfvSNiIiIiIiIiIiIiIjIWkYBjchhBs5nUouEWAQQBeCUx7nZShoQPhupYqrgmEVYcM899xTHNOfE4XvKKaccFNG0AsIJHNmkR7r33nuLc3UhcCQTvYXoEwgtcHzXASfyDTfckO6666508803l58h/uHcRMHg/KTg4Rx12gnxDulccABT7sUENDjeSbNF6ifO1yqUFdECIgPSstD+HJe+QYCEkCDKzN9XMp3VSkGZaR/EEYylOjD2GC9Er6BtiOiCaAAnPmORcYIIgXFSR0xEOyJeoa9o79tvv33Rz3NcIjUhIqibauoHP/hB+uY3v1nSf1Fu6hBCFOYo/fm4xz0uveY1rynlWExAA/Q7c4I0Px/84AcXFaAslUgNdN999xXREmM+UofR3nVFREGIpk477bT0s5/9rNRlsfJzfMYIIqdmwjkIIQnzk/UK4RLiOcocKeRoO0QxdddGBC0IR1gzvvOd76SVgHpFFJp2CDFlNdLWSkAkLoSEr3rVq8q8qRsNiGsUUZ4+/elPFyEN81ZERERERERERERERGSto4BG5DCCSCg45S+++OKDETkgnM5EPyFSAFEt2hFY4IhFlPPZz362pFvBAcq/I8IBTmVSsZCiiFfdtFKISygTZfzRj3604OdweCMweNnLXlbEM3VFFggrLr300vTJT36yCGdw2CK6iHLjiEe0gNACZ/Bb3vKWEl2iWRvh+EfgQLohHPM46BEXNIITnGO/+MUvLk7mxqgeC0H5eP3iF78oqXl++MMfFhEQbR7nQbQQEXze+MY3luOvVHqolYYx8LznPa+kJKszPom0RBSXL3/5y+miiy4qYibERYg6GCuIaBA50Z8IJXg1g7FAOYgwQgqnZhFRaHvEI4zLZmOdMUf5PvGJT5SIG4zDanod+hrhG3OXyDQIvZhHr3vd69JznvOcBY/LeZnjCMDof0RtvJYbRDOXXHJJEbog/CFiCOWPKFKIUBC2MA5p/zpCOsoewin6nfFM/ReC4yMuon/4bjMBDUKzr3/962XNuummm4ogKsRnlI/zkn4I8RGpuyj3YiKQELaw9tDeRAxinV1JkUo7hNAJsdB8a9JSYU0777zz0m//9m+XOcba30w8E9GiuEYhIvv85z+fbrzxxhVNMSUiIiIiIiIiIiIiIrKcKKARWeOECASBxfe+9730jW98I1111VUlLUxEWEFIgBgAIQlObqIGnHDCCS2lBcHJiaMYIQoOaRyf1SguwDlwsvMiLQsvHMzNwCFNGYm0gZgGJ/V8aUd4D9EKUUVw2DdLg8QxSLFyzTXXFFERQhQcyjjQq05bzocYA0EA7+NUJx0JDvLF2giHMWILPkfZF3JWI5hBYIHYBgd9nUgoOJspJ5EaPvrRjxYxBeKZiLBSTeGEiIT+oDyIpM4666zi4Oc8h0sKJ/qSyDwII0hlVGdskgqJsf6Vr3yliMcQjdCPkcIJgQRtxfu0I6l/6kQZoR3pT8rDuAwh2nzQt5SXn83aOiKCME4i/VkjETGFvqd+HBdhCWM+BGnVuREiK46NEIVxRp2XU0DD8Sgr0UJYYxiHIRaLsjAGGaOIVIgghIirrpCLejGPaMeF5nSIZZibrF30TR3xDGvRl770pbI+UmbaPiJFccxIi0Z/nHPOOaXfm6UO47wISPgs6xHtwLhbKaKPOQfjmHow3ylzrDe0IW1HuViPIv0Y31lOgQpthlgPwczLX/7yIp6hP5qJZ2hzxiRj5+///u/LWozocL45ICIiIiIiIiIiIiIislZRQCNyGIBzFQfxt7/97SJuQQjSCClMcHA/97nPLeITxC2tgIMeIQHH/+53v1vEM40pixB34LAmsgbRVnBE1xXQhIAC0QNO2vmcvggEiLSBEIVjNxNDhICGiBmUmTaY77h8jrrhcKbspGTCKYyYYzEoJ+VAlIRwAQEREUYaoW6Umyg0dVOcUCYizRBV5VOf+lT5Hef/fJEuQiiDaIoXjn0c3K2k6zrUhDiKCCqIVuoKaBj3l19+eal3VVhCP/NinJJmh+O9853vbBq1JNqSsiDoaCag4X1ELvysk04oUjXVgUgs1JFoHZSBucErxkDUNyJ7RCSaxSK4tEOkD0P4QOSp+eYR84axSmSa17/+9UXYVVdAQ3vQ1og/Foo8xGeYO8w1xDZ1UhshMKFciAoZB4yRKtSBiD/UjfdYv1iv6ghoKCefY5wgallJAQ3Q15SRNkY09tWvfrWUnTULaG/6nmhIF1xwQRmTvLfcAhXWFAQ0T3rSk9ILXvCCcr5mQkagrVkbma+IGRdaK0VERERERERERERERNYyCmhE1jg81Y8z8s/+7M+KeGU+8QwQkYDXxz/+8eLwPP3004vTvy6knMH5iRMdB32jeAZw8iLyIDrCxz72sfT2t7+9CFGaEWlRcIpTNn6fT+hy6qmnltRNpHBpBuWjXb7whS8UAQIO9GZQfhzOX/ziF8tPHMVELVkMHOg40onqg7CA6BCN0XOI0kCamDptERCpAcf/X//1XxenebNy80K8gDMfwRBlIloHYqnDIQoNggTqQAQT+o7yI5hgjCIa4XfGRvzOGCF1E8IohBKLwbzguAijiI5SJz0UYzHG42JQ1ojQMl/UpCrUidfv/d7vpcsuu6yUhzFK+RFgzCd8QdRB6q7f+Z3fKaIIysPnIupMiFsoB78T1SNEFcsBx/z+979fxHlEn+HfC6Urogy8/uRP/iS94x3vKAK0OunKEP5EFB+EIPNBf/Me6wup4xBf8G/6kjERKaP4d6RhQuzH3Cfy1mJpjBCmMHdJT3XhhRcWMVwzOAfjA9FfXVFcO7AOIgJCSPXe9763/OS1GB/5yEfKulRHZFSXaH/SoRF5hnW4znoWwh/WMtqX6wLXrOVOecXMm2UNzGN/cmY2be5pnj4s2J7H9NjM2krBJSIiIiIiIiIiIiIiaxMFNCJrHJzppCjC0d5MSACkWuGzOOzrCmhwmuOEJvoEkVCaOT9x+uLkXUjMMx+IPCLCxkKRUxC01BHPRBko8+23314c0K1AO9KufL+ZgAbnPw50IvoQAYLfG6M+EKWhjlO+CmKYSJXTCrR5RKkgmgbROlbSwb9cIIygzp/5zGeK85+xGSKFEEmEgCTGCGlgEMc0I8bTYiKK+b4Tr8VgrIQApi6IDxBekJbp1ltvPRj9CJFXpHfib4ihIj3Qj370o9KPjLeoR4hoGOv85MX8nE/c1i6IHSKyTB2REBAZhX5BHHTaaaelOoQoaiGxV9QJIQYCGsY2Y4Fxwvjgd8YL/44xguCvbpog6lVNjbZWiPUdMRBpyhgfdWA8tTLem4EQj7WQ9HCswczRZtBnlAORG1FnEGAxruuMoVbhiIyQS3dtT5t7+tNAV/30hLdOjqc9a6zfRUREREREREQOd7DZkWq8CvZLHrbi4TjsmNj4sKnzE9tgPCiKDYkXn8NWWrUnYfuLyNDYjsP2jQ0QOyo2Mez62KaW+yEuERERUEAjsoaJND844flZx2GKUx6RRSsOf242EaFEGpRmN558nogOdQQ9QQhRFhMtHHvssSU1UTNoFxzhOJv5iVMewUJduPHmO7RpMyJ6DsePG/ZGhz3v1T1/bBIQ/iBAQMDQCrQ5fUwUIBzd1P9wENBECh2EIhFFBBEEm6H4vVFAw7ivpoGJ9Et8hvHEi8+yCWNDFZuwOtBmIVhZjKqApu6xGcOUiQ1kzN0Q0DDP+DciFPqfMYyIgr8zr+jPxk3jSsJawbnZdNbdcMbmtm4qKfosUmstJKDh3KxviEmIJkS/0s/xijFTHSOkb2MdinLHsflczNsYSwjNQrS1Foj+ZS4zRpgXjI+6/R4Rx5YL1i8igDF2+b2O+JJ1kHFApCXKT98tZ5kaoWWuyXOjN42nPJJqf2/XzGRaPsmZiIiIiIiIiIgANroXv/jFD/hbRI3noTdsdyeffHKJ3o6dFDtdPDyILZL3eaCXz8fDddj0sBeT5p0U46SQxx7I97BjYo/EHsXDXMv9gJmIiEiggEZkDROiA24kcVrXgZtGPotjnsgodeDGk0go3KzWcaJzQ8sNbh0BShVudBeLQnHKKafUikCDk5ljEDXhla98ZTrvvPNaUptzs056krrRM4CbdZzwOOAbhUPc0FP2OiCQoH8QwBAtiD5uFTYHpAgiwskTnvCEWimLDjWRPqtOtJCFiEgk55xzTokIdPTRR5d2x+mP+IqNWF2BRERDaiY+YkPGHORn3THGOA9RVQjCIpoMfc8cZQxFNBp+XnnllWVOEYWEvo3vrDSMQQQcbFrrQj1oj1ajJ9Uhnj5pB9qd8UFqMyJCsf49/vGPL2OD6FaPfvSjy5hZK9COpGO74oorSvSW1RJNzQfrIe3FnKgLwiuiAJG2iWtHK6LNdtk5oxRGRERERGSpYEsh7fcb3vCGsm9tFpm1FSL9MKmzibqLA3U5o6iKiMjaADsctvLf//3ff8DfsVvzcBwp47HPYbslDTy/Y4fFps91AXso9iQ++9GPfrREx8bX8KIXvSg985nPLJGSsfERuQabMN/D9sTxsac+61nPSpdeemmJYM71Zq1D3Xng8mUve1l5sJKHAonCTX1W2iaIIOkFL3hBuT5jzyOyfSsPi4qIdCIKaETWMOFcJ0pBK3AD1Ep6JT5LJJS66UO4ueJGdzlvsriRi0gizYh0UAhgcPq2Wha+H6lg6hKRL+YzLHEjz6sOsUHgRpl2b6cNEeHcfPPN5RhLEaSsJegT+j4ijiCQQfTA5oqf9DPvM074W0QTYQMVv8fTCMsJc49oQWziHvOYxxyMotRO/SgbUYwoL/Vgk0lfMibYEEZqMTZ+CCt++tOflp8ISlYq9RDHjgg5dQkhUKvr0lKg/aqpnBDFIIahDYmcgoiN8cHf+RlRjWKTTZszPtZKBBrakHUaYzJzuR0h3XKymLBxITC6I1B6znOeky6//PK21zMREREREVldEM3w8NLTn/708vty7qPDXsQDF/wkZXBdW5OIiBxeYEtqfFiNBwexM2FD5b14yBDbXFxvuFZgI8Vux2ewTRLZGHHHa1/72mIn5WEvfAXY9SKyNfbRDRs2lOvLs5/97PIeDy+G/2St2smxUfIQLOLVc889t6Swv++++1atvNghaTMi+tBmtCEiGtpMkauIyPwooBFZw3ADw01nq0/2czPZync4R6vRQbjxWk5naQgL6kRAiPQs3GQjRGiXVhzGkQpmPsNSOOvrQLtFWqB2Q0xG+iqc7odrmMpquh36PXLmIn5gc4Rohg0QYhnEESeddFLpaz4bqZciJdBiqYGWCu3LZoIoUERd4fx10tvMR4zbSC0UMI+od4gqECbEfGAN4EkMNpKtpEyrS6QCanXDxhhcjU1epNqi72kXxgPznqdX2EgjoGGcMF5oQ/4dT6U0po5aqTHSDmFU5mmTVqIbrSStGs0RM9HmbL4RARHNqN3oQSIiIiIisnrgOCMaAA8jhICmat9pde80n20IRyFRVtk3rISAJuwz7K1jr7wUG1XUOdKLROpwHYvtExF/I9pE/E77YguK9l2pB4bmI+wy4YiPNOuHiqrtArANrAX7gEgdYvw22sSZY9js4gHIiMrNfGesh103Hm5FQIPdD2EnUcBf8pKXlGPE/OR7seaHXRV4qIvvYRMkujM2qeV+4HepxLUF+9kznvGMEjWHa+/Xv/71Yuudz64/3zV4qXWi/REnYV8/44wzStvT1tFmq0m1fnXr1WjXrbt2N7Zlu+0Yx4mfzdbp6ufjnCsxLperfiIyPwpoRNYwcXPZqkiiVQHNodi0NoJzvKpEb0bjjctKw+Y+wkzO917dNEqRwoloDe2mPOFmKFJ1Hc4Oa9qTTQ4vNlY8YYAwgigijIeF2nu1weh30UUXpec///lLEtAsRNVgQp0REpEfmCcpSNP1gQ98IP3qV78qAoXlhjHIa60KsRASkT4N4y6bTNoGwQyb6hC1HY5ESjOexlzNSD7LCWMWY/vrX//6kgKMFynIRERERERk7dPojGJ/EsKCdgQ02JRiD9/4MMNywzGJWovdABsCKZFxBC7loZOIVEx0AI5NnUitgcNxNdLVHomwl2ffTtuy92WMYT/jISn29UTCxdZB362WPRJnPXYGbFBEScKm1kpE3uWGOUd5eBiIOUNEilYiiousRRjL2Ml5EfEeuxcv5jmiGsY79iSIawTCDl6APwThJVG6maesIzxsib2Yh+rCd8B3sSkjonnhC19YIrWTpn6t2Tgp76/92q+lCy64oNg13//+95cINNjR5iOin/M96rIcDzFzHfunf/qnct3kmK961avK+svvREJfTSI6EfXj4eA6okGuHeF/4VrC9+pcmzkP4yfssCGcbIW4l+H6wbE4JmOt2Xf4HNHQI7XlStxLLEf9RGRhFNCIiBymcAN2OD4NhXGAUJxnn312Ou+884rynk0QRqrYJLSTUmalwHiBUYUNDhue5z73uSUP70rCzS9GpQsvvLDcoH/rW98q+YDZPHYCbDB4MoO2JnUWRkzag40SY2StpGJql3iakegzh7MIjs0uT9GQv5m++fCHP1xSnq3UunRsnhf9KW9CU/1oOfdNT6ZJDPrJDaSIiIiISCOIB3BEfec73zkYMQAHX11w+BNZEzH9OeecU5ycS4kUXAf2HuwTeYqePSP7KpyASxHQRCTcN7/5zcW5i9P2rrvuOmwfeFgL8BAM7Yp943Of+1yxZxD96MlPfnI6//zzSxsTheEHP/jBqgloGN88oPOiF70offnLXy77VxzuhwrsY6Snf+pTn1psYN/+9rdLCnEdoHK4w3UFe9dXvvKVspYy1xBKHHfcceUaQwpBRHYRRTpgLbj77rvTj3/84yJi5GFC7IDYjRFMPu95zyvzmLkD2I+xETKPWG/4vVFAgwVpmMhX+TxjeW5NEOkprQ6RUv6ss84q10YEg9/73vceZAsMIcTTnva0Yh/H1sbfEBLxHVLAh72N9YHPcM3mhd14IXgoFKEO12m+SwRpBDPYXIngEw/DtRv5ivaPqPJEEuI6zDlZ36vHpG702ZlnnlnGQNSPulEvoq9zP9FIRBjiexHRCKEI52Dtvvrqqx8kMIqI2U984hPLdxgXvM/1HOELQiKEXXWuO9SNsfeoRz2qPOxKHajLjTfeWMYmZWi8T6BPEIkyJhEsUV7GJOMZ0VLUk/d48bnFMhvQNrQT84K60gZcSxlT/KzWD7Eq1xDuiw7lg/IiRwoKaERkTRCh9+puEuNzqxXadLHQrq2Uu/o01lLzjHNzVTd11FogUhdxA4uhi80SN8DcYPMEATeAzUQzjWEPQ2Ed/+YmebmFNxFC94Ybbihl5fjcMEf+3pWIlBPH4zxsQthsPvrRj07f//7305EMY4QNNJsNNsWMD8RWbAzZEDR7grE6D2NeMndjnVhrUWuWOxXechFlqjOuWcfoL0K0M0bZjBKGdjnX5ijFGcPr0jE9/dnwUb8PL919f9o1PZV2zbpxFBERERFphHt3HDNf+9rXinMyHHchfFgslQTfJd0xe2Ue+mC/jINppQU07OkQubB3xPHE3nwpD1lQR47Hfubcc8896PhlT7Pce/2IPItDlf1+PFUfEah5EfUmog4czuCcxVGKA/LSSy8tbUr9Q6xEO8Q+f7VgbBLlAnvDNddcU8p0KAU04ZxFVEQ74NiupvwQORxh/CLORKxx8cUXF5smL9Y0xjt/Zy6yBiJwiHRvgA0PoQERWoguxvd4H6EBD9Zhf+KhRtbQsBGyhrKmICaoXgtiZTmpfyCd0NufNufj7JyZTrdOTKTd+ee+uZVfY7Ebc43CDk67ILzgutkooKHcXH+JpMMaRfvweaKWcI2mnRCnIJLgb1xvuWZhY2cdrVJtl8svv7xcTxDQ0P6IMBDjIJzhes0xvvrVr5ZjtrPu0A+UBTEr12QeQr3kkktKObmWRnm4xmLfffGLX1z6MPqPduAegvpedtllpf9D+EHb0RbPec5zDophqAPjgfsV1u6I2hWRu1hTQzzzghe84KCoiu8g4kQ4A4ho+PdidaZ8nJPxhuiTeka5EWIi3qGMpA/jOBHJjs+T7p5rIJ/Hb0G56d+oI7ZTyobQhoeLG30i1T5kLiCKoe/4N2UiMjttSX35G/dFiK0QLjGvmDvUz5SAIktDAY2IHHaEY5ybgNVS01ad8EtlOSKs8N0wuBwuYCjhhpgbWIxS3EwinKnbDlXRVHUMVPO1xk3jSsAGg3Nx04oRiJtVNgcrHS0HgyAbART5PJl1JBtSMNCywUBF/5a3vKVsCtgM1BGbVUVVMTZ4sVHkxd8Yb4dr2qfVop3xxXxgg8gThj/96U/LJnm5Q+Zyw3rh5qPTowby5rynvnDwpomxdEv+uWtSAY2IiIiISCM4uXDofeELXyj7sUiRwb09DsuF9ro429gjf+ITnyh7gKuuuqo4lNiDsYddSdhr4ICNFBfslRHzVGkUISwmSqDeOOlwuOFQ/OAHP5j+4R/+obTLQvuaaJdW9k/hDMO5RwQdUjbjVMQpx3l4YhxnMREbcHayr1ro+K3Ur92yLvU7OAtpV/b0POxEX9FPOB2pM84+npZfyNbWThniewt9JyITMFb5Od9DWK08ILdU+wxOXZz+CAM41nwpw9s9Tzvfq7ZFq33fzBHd6jHbOY+sDRAMIG5AWPn5z3/+ARHUWbtZsxnrrLeICKoCGtaFz3zmM0X4wRoc6wMRR7jO8JAh38UOFWIZrgVcr7CTNz5oijXx5Zu2pGeu35hO6R9K9+ayfXzb3ennY9m+O9F+1LK6YLdnLaTcrO08GNn40FmkJeRB03e9613lWoAdmOszayhrJxFjaI8QWSLK4VpLxBqu2w+oc/4813HWWezYtB2iJEBUQeQU1uFXv/rVRYDCdYhrTqs+FsqNkIUH6n77t3+7nI/+pZzVtFB8js+84hWvKGngqR/9TB2JXIcNGFswZeRvcT2nfohn/tW/+lflnoMyEo2FaDBEs6eOEdEnBDTYkTkW7cg5GWuUh3545jOfWcYb/oj/+B//Y/rZz362aFol2vHZz352iUaPLwPhE8IXvsPf6FOEW/ydMjMeKRuR7Dg31xjs+IxXfscXEmmgEMWEmJR+b/SPMCe4djIu6O+ISM+4Zyy84Q1vKO1Ge9DmjH0i/VNPyvwf/sN/SD/5yU/WXDozkcMNBTQisiZAIYs6vc5GiJtFFMPcUH/xi18sBoaVhhs7zjlfLmJuNnlx09MMbpK4mYuoK+3ATRSbDG5wuZk6HKCu3MC+5z3vKTe/3Nw3EzKE+IF25waVm0Xanw0TN8DcOHNzzc0yN63/+T//52Lkm8/gsBxQHs7Li1yxKOfZKHDzz009/cENa/QLfb0cZYlQmJyH8c6NM68jich/ywbn5S9/eXn6CiNSM+gTnsCgPRgbjAWeouDFEwxsFpibbG7e9ra3pde85jXFSCnzg5GDjSXtSdtiQGaT1ww2iWxef+u3fqts8Am1+93vfnfZUjmxhezOG8nj+vrTQwcG03G99Z8uXUfkq+61kQ5ORERERGStwUMh7L3YL7F/QtDwZ3/2Z8X5iQOI1DLxIALOHe7xscHgMPrTP/3T8nn2A+yRX/KSl5Q98krDXgU7AeXAPhBP5AO2FhyLOJ1wKuFMwkmF0ynsOuzpq+kNsK+wp2ePz7FpD56QZ28fzjLguPyN9zk+7YEdi+Ox72RvOt8eCCccbcQ+F0dZpMriuPF9bAccm6fRsZngeKaNf/jDH5bjhq2M9ykHZeB71I09G/9mP0xbxB443uM78fAR/UWdOGajcCXajmNhs6F+fI7z8OQ7x6zWj/cZG3yWc+HAxobD3pw9eQicqrDnpJzYcqg7v1edtrRD2MzoM86BYxL7D+fnfLxoG77P3zgH36HcfIc6UA7agjFAHeYTIzE26Asi3+Kkpmx8DodkY7rliAZAH1HPED5xjohqwN8oC+XCYR3jBltYpCunHeNcPJw138NCjRE1oq/DNrYQES2B+kdf0l8RZSfqVI04G9/hxVjhJ2Wj7HwHW201MkVE02BMcSze40E5xgB1oYykKIm+ibQ6vDhu2E/D5tDMBkz5qD9lo93pX/qI49NPtDnjgb9RXsrEeGIdwj6HPY2xwniIsRspTxAtsYawLnRKuvTVgj6gj1gH4oG2gH6nv3iv+kBk9buIO1gbqmsUf+d7zIHo54BxEutNiBDWd/ekk/sH0tkjm9Kbjz4+HZ3tSP35/WPz3HpHz0np6n170we33pV+NTGeJlZIlEV5GLekpae81JnIV41rL/Odz7z1rW8tglQidoU9k8g1PLD2yle+sohl+CzzB/EHQpgvfelLDxINcd1GTEE0G9qy6jfh3GFbR2jBnOaznLNRiNoM1hmuV0T0on70JcdvfNCUtRbRKGIZotOQqo7y05+IQbA9Ii5hrWReUw7aDls473G8v/zLvyxtwxrD8UjDR/24pnJdC78S9zRE1eHvf/u3f1uEWKwBrMGci7YkDT3loR1YhxfqO9ZDvkMfUG5SEbIWU9e3v/3tRSzz/Oc/P3384x8vazvl4vM8cMs4/e///b8XIRGiGdapP//zPy/vsWYioKFc9A3RYhp9JJSTerzxjW8s/RwpsaJ+nIfjUX5efJ9+pI3pD75PGbDxikj7KKARkTUBG6uIFMEmZzEiBRI3jdw0c0PQrqOW49RJwUS5uLGb78kYbuzq3mRyQxMiC26YOH+rkW04RoQNPByiadBfbHJ5wgcnO+WuE1GEm0Ne3OyzEWbzFEYyftL3/I2+iYg8S02L1QoR6pHNCsYz+pRNPZtw+paNOhulSLXFzTJlZNxy89xK6qf4PjfKjMMjTUDDho02Y2MUIZ6bEcZPDG/VfLCsB2FYYvwwTqL9DqeUZ6tJrIFsyjDQIj7CuIVhCSNyHRENaxHjmo06BkqeRqU/RERERERk7cIelf0Yjih+4qD60Y9+VJxp7L2xtfCUM44h7vkRJLBH56lq9mLs8RGgkEqAPf9qRMll348THyECTiJSMcRej/04jkgcjZSPfSb7GhxhfI99InUk5QLOM/bXOPl5IQrgOOyBcMghBGBvic2GdqIdIsVw7OlpH5yiHI/vsAeqCgM4J59nn4tTK8RIfIc9LLYkhA1AGdnz45TjwQ8+iwOV/W6IGHCc8T7luPbaa4sQgDryWWwjnB+HGfYKxCG0EeemXrxPGXnYgc9xfog0Ujje4mGtSHlB/SgDTkhELHyPv/Ee58SxiNMz0n5RTurDXjzSXlftdbE3p4/Y03NMXtSNdqF+HI++oD1CkINQhbYK4Qr9QhtybOpPZIGIeMM52c/yXfqFfS6Clka7HW1IWRi3HJPzR/oYHgoJ8U20UURmYswjGMFuEXYJ6kzfRXSIEBwBjk7qQt3pS5zCtCnlms8mxOeoC2k9+B7nJsVKlGU+KAvlow8R3lA+xihjkXJQFxzm/IwUJhGNh/LR3tivOBdlov1oMyI7VMcKbU39efCJPsFhzXHoF37yPdaGiDBBe7EmMAcZMzE+aV/GCJ9fCNqB7zIXOCeiGPqW+jBvmeuUm3rT5kT34Hi0E+I/2oD6hQ0xxiFty3xHPIBQjXoqoFle4oHI+YR6QF8wH+mvRns8f6M/GsdG2K1CDNX4vZhLPHzVn1+PGhxKTxweSedt2JxOGRhKPQc/053fG04DXd3pmrG96e58nqmZ6bQSiW5CZMiYYz4wj+Yba5FajuvZRRddVK7BiCoYt8wx1iVSCEXadOA9XtUUdCGKQ6TBd1hbsc01Cu9CwMTayrWN+YCgo5V6cW1j/ed6xPxHDMLaTb81rmvUn+sR85f1lfpxH0E/chzWX35Sf8rEOhXrIGsg5eV6xxoW44L1gM+zDnCtYa2grTgHbc6aw3coFy9gTeBcfJbXYrbn8DtxbtYQbKWUmXaLVFy0G9dX2rAaRYm1HVELayHXXOrCuZgPlCGiwoQ/qdF2yrG4PvGTYyHaiTU46sbPqF+IgGgrrmeUp7FMItIeziIRWRPEEwTcODRz1kbOaG4wI8wt320HzsXx2CiHkYObzOrPyEW9kNAlNoZ1iDRG3BhjjOEmarFwgY2Eqh6jBmU/HG6GKCMbeNTd3FxGvtDFYDygyudGkFzs3JhiYKhueoMI0bncubNj4xGinOqx46kibn7Z9IeanE0DN/GUhZt26h0GSfqcm3o+x88woNQRdUQOV4wDiz1xdLjCnGBjhJGTTVUzAQ1jgHZnDhFam00D/2ZjUn2iKqBfaO+Vik50uEN7sgllM/qP//iP5SfrEhthxi+bs2biNN6nfTG+sS6zsaRPwBDLIiIiIiJrE/br3Ms/97nPLfumEGYgPGA/zh6cfXxExcDx/c1vfrO8+BuiEvZxpDNgr7saD7WEyAWxAFFGKRPOfMrK33GM89Q2jjrqx+cj1QQ2J5zmOKQiEgJiDhyT/GQviu2C/RFPjuOc5Bg4yUh3wUMfHAenVqRi4Ng8gX7ZZZeV/TrHrLYvzn8cjS996UuLMIn9VqRnjtTk2Ds4HrYCRAekuqBtY59LefgcYgKeeI/0udF/8eASQgL+Tvk4L2INvoeNgv4LEQmCmHDIsefD3vC6172utANCinD68YqHlYiIEA+w0U7ssel3hB6Um714RC/BVsJ4onwhEAK+R/sRAYDzh0CItuA9xiGpMugDoE/ZX9JOnJuyYTP4zne+U94Lh+SFF154MGUGY4Ey81lsMnwWm12jgIb2pW2wsVHuiGYSqU5CpAPYLLDDvelNbyrjhGPjnAbag3JwLpy/2K940CrshIjT+A5lY27xOw5PPtNow+LftDmfYQxgA8LhTn8tZv+LqLC0a7QD7cWY4sW4IIo39aRcnCdSWTFXOB/tSH3j4SP6h7bBkR9jhe8wRt75zneW49Om9Ddl4zwcg3Zi3NK3zJmIFILNh7HAvAr772LClXCg034IpHCWI3aJeRVjnPIiEsCGGGOCz7NuIWpCWMOcjHnJ+GEe/+Zv/mY5f6Sjk9WD+T6fCCaYT1hTF65AQ13d6VkjG9KT121Iz8jjo7dhng3n9eyEvv70wk1Hp6/t3JFYGVZCQMO6iVCD9YL5wHirRrYKmFesofxkbQjRFzB3uQ5xzcJGVxXMNBLrB/Oa9Yzv8IBcox2Zto/5y+cQobTygC714jyIQvkuc5zrKuWfTxQXUdtZx7HjskbH56hfiE9ZuxDPxP0G6y5rOWtWXF+CEA9x/eHYXONYp+IehOsGn6/6ECgnfwuB12ICvmhPIuVQPtZByh3H4/x8P66TnJdjUibESKxPEUWJNYbP8oq1cjGoO+sdUXToP47F+Im2Z26wnlUja0HVfxXnFJGloYBGRNYEXOC5IeDGgJuvxeBmgZsNDAEYR7gB5Xvt8NrXvvbgkwyRf5MXm7pI2cSLsnFTx98bb+LjKZw6UHZehIjleBhN4iaoDtzQckOKQYFNabObrkNNCIbYjGMwwsDSDG4CyQn7f/7P/ymGJYwpi4Fzn80IfbhcEUZCPEPZ2exEtKCDoUDzBgzjThgwGCvcGLNhp8yMET4bxgo+G6GeY/OEMYTNDxv3ZlAvvsvm/0gLv0g7US/CWbOpqiMKw6jzhS98oYT95EmsZnl6Iw9tu2nTjnRYi9ig/5f/8l/KZo9NIWP4s5/9bDF8/e7v/u6D8vEuBOsSxlz6kSc06JtW8yiLiIiIiMjqw54J5zL38p/+9KeLgIZ9F/DUNraI//f//l9xZLHP/cM//MPi4EG4gfNqNSPC1gEHIU4vXjiTIhUD0XJwivF3xBVf//rXy/vsdxCofP7zny97TZ6SxwFFu5CiCmEO+33aAJEF+0z2sETjQBzDPp+24djxoBTnQ+SDQxMbB456HIIIC7ALsddnv4Tdg7/j/P/ABz5Q+oHvIJbBPhKpeIJIv0s0GRySHAMxC8ekLPQdgpePfexj5eEGhBhPetKTitCEVFsQQhHsNYhJ2MddfPHF5fPUgXHA9y644ILyPWx12D4Q6FA22oN6sO+j/Ig82EdSdur967/+66U+VQHNQjCGEKCQFhgbGQIt9vqcj7GF/Q/7HU7m6r6UcYiQijrQJh/96EdLv/Ed+o0yRFoh7HpV4iGSL3/5y6WM1Ik2wlaDzQ3n5Cc/+cmDbUTKDpyatNunPvWpIjLj/OyBEf5QxoUevKOfsedRDlJzY9NgfFKfKmEbYQ+ODQixCWlIEIkt9OAg9iZELf/6X//rUhYc0DxohNMXWxa2MlK0Me5pF2yYlIW6IprCroptkn7ku5SJPvyN3/iN0r+8j10gxEQQabQoH8Icxh/iGcYEKV2wc9GmpBgJ0QD9Sx8SHYM2xgYR6bXmay/GG3OL49FXzAvGGOdi7nGMiCIknU1EpimCuPzvTT296THr1qdTh4bTSPeDhSFFaJJfG3kQDDEI6QlX4MEv1tCIVB7RZOZ7iJa5zlrCXGDeRIQS4G/MH3wTzOXFHjrmOIgPEaIAa2g1XWHAfIoIUszbuO7Xhe9wDq4lCEe5ruGXoazzCXEi+gznYz2Yr374ZFh7aIcQiCDwoewI6XixfoWwiH+zVjL/sbNzfL6HTRP7O9cwrl2cmyh1HJu1hGs21wiEStU1rRGuufh6uAdivYkUjdSPtuJ6Eem0KHv0HfcT3AtFFDTKFAIpyoqoiXV2MRAmcc3hnoDjUY5Y//kuZcf/gAiQ+xiu9Ryb9Zcxwt/4TDzUKCLto4BGRNYM3BBww8XGs060A25AMW5wk8LGcL6cxvPBjTI3XdzwhVqaTWqkkYqQn/zO33jhSMZIwE1R44aYm58IHVv3hpPNLUYBNqw8gVQnjRQ3aWw4MYjwPYwza81A1QjlC+EHBpE6xJNetCs39ItBX2LAwDBSJ+1PXehHbr4xMNBXbMpDVANh/Ij2p6zckGPkYRxH9KLYwMXTLvR5HJuNADe33Eg3yxMfkYcib/aRBHVjLNPO8fRcMzA6xQZtMXFG5PNmfLC5apYerlNhzDJ+I6x1rEVsyOgPNm4YEDG+1VnjMK6zkWUzHeFEW01Vt1TKmnrgZzIAjoiIiIhIU+LBDe7l2cuyL7/kkkuKcwZHEftYHF3sX7FLEOUBewrOq7Vom8BJhkACRxr7Rmw7OKHY5xMhFkcU+5tII8R+HXsEv7PnxNFHeyAiwSnJvxFPIK5hD8V3cZ6xT0Jgg72GvSd7IM7HfpS2xP6EvYj9FQ9w0Wb8HXtH7JPOPvvscrxIVYSNie+RIjci3VSJ9ETYqdjHse8JW8O5555b+ok6IIrAoUg5+Q5OT2wz7I+BPXKkDuG8HIs2Q9yA7QE7Bp9/61vfWtqB8lOP+A7npb6Ug7bh35FaGdFN3SgS2OdI/0FdKTepgxCNcH7GF+0RD91UH8yi/eKp/khbQR9ju6MtqQNRX+Z76I19KuVmfGMDpMw4qXG6YqNAjAKMAX6n7RgbtA8RBiI6EeOGMoZDdT6oB2OAelEevlN1IgNlZV5RR/qHPTptyovyLWT7YPxF6g7qzOcZGzhzsZNhrwoHcNhOaW/6k/NhV+FcCLX4PmMIB3QIqxjTiIMi4g7QxgiSWCOYX/QDZaD/ENXRLpyP8RciGc7NPKKtODdlYJzNJ6ChvJQh1iLGHI56fkbUIPoaW2OdB/XkyCWi2TC+mL/78nianZ1J1+8bTYNd3enonr60BTsWNt3qd7KhaHf+3Di/r2DU5Ig4wpq0UFQQ5jBjnnrwmar9LPwFvLgOLGSTC7EO1wyuHYgamX8h4qjC8ZnDsQYttG7NB/Y+7LdcZ3iQlPWM9YN1I+ZmIxw/IqeEvTygzpSDVzysGp9jjaEeiO5e9KIXlWss1wI+w/0H9yJ8Nh5WBq5jXO/4HmsX5WK9iTWan0TeZr1fLC1elI1XiFciJRdrFyJBykjdaYdIs9godKSsXDdpM64lIXydj/A7cGy+x3WC9ZyxE22GgIi1mPsXhKqMLepHPbl20A7c+7CWN15jRKR1FNCIyJqBDS0bb25guPAvZoDhhozNFDcV3HziTOcmKkLYzbdJr0YP4aYLEQqhhiNMYoTPjRvTCH3HMbm5iZySjUS4QW5oIq9vM9gMsxlFLMRmkzqHaGe+PK7Ul40hG3a+w00RN33LmbJoJaB89CVtTH/VITY+3IAulBor6s2mACMLN42tRJ+pimEWIsJCc1OOMWux72OQiHzW3KTSl3HDH0aOxhtz6kbbsLlpJqCJMcE5j7R0ONSJ8cGGoq44KEI9RxjhhaB9MXQx19nktSKyij5e63NsOcCwxsa0UbAWT6axuWSzx5MbGKeatQmGLPoT0U2EfmadXM2xy5lmWMcPCGlERERERGRxIv0D9/LYGxBJsNflKXb2s7yP+APhBCID9gjVSK1rDRxb7NFDPIFjLaJVRIRY7Df8HccrP7EDsVdHLEOd42Eg6o24BJsVEVpin8/3cA7SHhyTtsOhhZ2KtsHxx/s467BZESUGuw62BiLZ4GyjzUm9gy2E7/CTvVnYmDheo50J2xHCD+oXUY0RTeAwZA/HHgwHG4KDeLqfciD6INJM7Osi1RE2CcqILYa9YdQvBBmUgT017UB5cSDyHeqPrQwhRbQz34kIK3WiJseDL4g0qBfHQzwTT+nTJpSJv2O7qwom2GNSBvqN/T62NuwAPHnPd3BWUv/50qbEwx58ju9H5Af6hPEf58HuxBjAtkCKcerK2ApHOMfmMziUacv5CHsffcScCvtQdY9Mv4Vtizog7qEdaMvFHkihDykr/UN9EMRQb75D29IvHIPfwxnM8elDxisReKgT34t0IIwfnO+IYWhTPse/A47BWOE7/Ky2Aw5exiv9TxuHjZVxyucZNzh86cuF0mwzVrETscZExIVIIRZtgZ2ChyKZY9LZMG4RY7GGjyHGmJlOVyOgyWvHwweG0lF5PHYx1yrXqqn875088Dg3m1Yq0Q1zjvWL+YBvAZHFfEI45gHzPgSBC833xa63IaDh+sLxmCus3fOJKCJ9YZyrFQEs6ww+CSK6cU1kbvJCjLeQzS+OP9/Dw+F74cW6G7Z9/h7RWqgz9kXuPVjbuC7iU8FGyfpWtd1SL9Yg1iXKyPrF9zgu1yPGCNdB1qtWo2VHpHqug6w7iCl5cb+wULokrkusd/ifuP8IYetCx+c6wHWcduI6xuerIsOI6sZ4R1TEfQfCRL5H/VjrqV/cz4jI0lBAIyJrBjZS3Cxwg4CRYqGNFPA5bg5jM8fmjTC7OGmrOSkb4aaNTTkiFMJ9ctNXpdGBzw0VNyrctHFDNN9x+Ts3Loh4cNTXEdBw48bNJWXhRpMbQm4C44mO6g1lbJ6J5sDNHyEHFwvZuJaIfuKGsa54gbovtmGI43JjiHiGm2javdVyLSaO4NzclEaO7GbtjfGLzQlPx9CfdaIhYcDixhbjG5v+Zsyn1D8SCAV/PAFXhxAmNdsMsKlhzjB36MO6Ap14eqGVEKaHM7FJb4TNPZtRnjpls4cxj3Zs1i68z4snOzk2xjfyIcNqjV9Wap4kwlQwo4RGRERERKQW4cDBMYWjjIeW/viP/7g4v9kf/MEf/EF5j9daj47a6KxkzxPpIsKx2ewhFQQBOPL5ibMQm1PjMWkb9va0F6IEnP8IGnBsEcHjoosuKmIInGhEUcY28l//638twgW+z79xerIvjkglsfePJ/cbqQo+Av6NmARwIGJzCOEIx4105QgucAJS90gtEY5XyjVfihHgWPQ5ZeLz1A9HHfWPtBoQ0QSwkSHCamYLohw4RNm/cyxe2NmqdeV4CF1wLFbBbsN+lf7BxoaN8G/+5m9KHbANRrqtalqtgDJTp+h/3qfNwu4X7R4pQvgctr9GZyllw5bH3/ncfPB57JYR5Wg+sCfRtnzuQx/6UEndga2wmd2DvmDsxcMr1chGEZ2j8eEj+pzv0G60K+9X7Z20RUQA4nP0dXUcYiujvtV+ol7MD/6GPYCf1bLze4jVGEfVqM6NRIQZ7ETYzLC30S7VucrfaHfOKZ0DYyj6nnGGDwGb/Uc+8pFiV997YM27ZM/96cqxPelru7enT5/2hDSYx1Q8djmbbUTbpybTV3dsTftmVk5kUH04lznHuostu7peAusC9WL+s940PiAa9usQvcxHXF/wGZAmLlITzgfzjvnF2hyizWbQ1qxv//Jf/stiiyeay/vf//5SphDFRSQdfDqs/cxNrjl8JqKyNc55yhDXpPhswLrNmst1hlR9HBMxH59jfSISGKLUuGZyfK652IEpJ6n2iBjH9Zey4wvCf/Cf/tN/KsfnYWnea0bcF2ETRbRCRDaEM2QU+MpXvrJgFC3O+a53vas8mEubve997yvCv8Z0ggF1w09FtHr6kPKFXyLKQTsg1nzTm96U/u///b9FWEhZGFf0Pd/9oz/6o9IenIsIQSLSPgpoRGTNwOaKp2cwIhD+lo1SM0ctNyMoiX/v936v3AShMI70LhGNhpszbsS4WWVDzo0LTzE0i/oB3NTGkxjcoM8HG2xufrixQRDDjW4d9XaER+bGLZ5kYmPPZjJuitmk8sIIQ25ibqSP9Py+iIW44eNmODZGVbgpxLCD2pyczPzOhr4VMGbxBBEv+ha4GWY8RUhN+gAjGAICjCrc0C8kuKFMKL7JP8o45gYWQ8di4SDpe4yOdZ6WiTCe8RTckUQIgxbaBM4Hc515ydwjBHKjQSlyDJM3nPWBjQr9W/fJSMYgT46xcWGzUX2iLTbArZT3cCYEhORdZ5PGnGFjXAfGNxs41jrWuDAKtEpEk7ls14507/hEOrF/KD1lZP3BXNXzfyePq9xPM7M84ZJERERERKRFIi0O9hlsI+xFcfDwt7WeTnq5YD9EvdmPs89sTAtMG7G3x97E77QT+3f2lNgXIg0S+6CwQfE7e6MQ4vAZ9kzsO3EGh6CkmvajjoOzHSJtObYzhBfYtbBNBVE2bGo4Molow144otpEFJGqw5exwfewu9BezZ7yj4eoaBfsX+FoDsLpil2s+vd4j3ZHZEGbsn8nUkzY0V760peWMlJH0lq0Q4lqkccAZeC49CvnjD7hd+x01LWVVCiNhBCEskYqcUQj2KQWE9GEKIx2RhAzX9vxd/qEzzBGq+Oa+oQjPc7DZ9n38zc+EzaR1YJzcV7KSttS/khDFSIa5kiIm6pCHoi+oV6Rgj3g341/k8MHbLg8oBXzAiENvyOeebBgpCt1zT3YZnTX1GS6YWIsXT02WlI5rRTxcCaCD2yM86XjA95nrjPfGNeM9RB3MoZZY1lfsI/PF6mdsczxsdcx9hGcVFOuNUIZIl0SZawzv/kOazMinYhEhpiE9ZF1BftfPAyNHZC5i48D2z5loR04XzXKDNAmrFn8nfW7Wj/+Tr35G0LUeDiX9Q4xDeXg/Pyb9ovo/az5tBURv/APIRCkjRHkcK2h3HyXYzQT0MT1mPWQSHH4fbjWfOELXyjXyvkio1Mn7pUQdRLRnuvrN7/5zTJuuY7OB9+JbAm0Fb4tylstB+ODz9AunJe0e5GikbpzHaSP8KnwOcaDAhqRpaGARkTWDLFh5gaEmytuUHgtRjjEuUHAUc4GmRsgXiGEiLC0bLi4kUIlzU1Es6dg+D43XNxsLZY7knNws4n4J57mWSx6TrXsvLjJDIME9eCmL/IbU2Zu/PhJ3SKyw+FCPO1C29UVHFA/bjS54cbgguM91Ny0F8YQ+hpjAn1ZN21WFTYK3CxzI0u54skXjs9NKjef9D/jEAMWm3HGy0LnqYZx5IknxgD9hbCK/oyIOhFSkfPz5BRRPRiTzYgwu9wgN+ZTPRKIp7HqwjxB+R9hPtmYxdMGjBnannHCZ2jfVtOdMR8RZbFxoe8ZA/Qfm1jGRjwV1ynEBpy1kFDVdQU0tCObeIx/CMVYB6pP+LUCW/lr8hjZNT2bjiYndP7fY4bWpWP7+lPvPH3LKaYOpnBSQSMiIiIi0irsodgHE4WG/XFEo+gkqDN7VV7YZtjLs6fn72FrqtqXsAmxv41IAyFA4G/sVUMEEOkVsBGEczQiKocTlWNGlJlWU03UhbJRHvZp/E5E3R/84AcH68deOiKchH2E/WFEs8EuQ72qe+5wiCI2oW7NHqJgf0gZ2NdzHL4XkU+pd6TeYG85X4QX+iSiw/AQFLY5xErYA974xjeWcuPIbZfof+odD7lRP8pbTYPV6BhulXCiR+owHhrDHoEdqCoMiIe7GCe0bQhoGGPYDkNsEg8U0nbs4WlPHNHxnXA803+0Ie/znRiTtCHnoUyUbSWjyTLWwy4XkWYoI+elbJQROxDlD1sqdp+F0kBFe9FWMZciigTH4zsKaA5PQmQYa1FEf8JGVx2jrEYDrGHd+x+mC6sRD2fdkcfH7fl15+REWslH42IcM26ZTwsJaCLNHPUJoWaI9FhXWG944aOIKGMH63lARMgaxNrE+sGa0SgqqxLzIAQ0rGV15jfrCuXge6wf2O4pI2WIqFYcj/UGmyx9wpymPLQD543rAn/nnFE/ykOfVq8X/J15zucRTrEecE1gfhOJhXPQbtS5es1izrOO8DBg9UE+rg+8R5k5H2WpU2c+h00T2yb1xD6KILPRRh9rDO1Af+MfYO3Cz4UtlZ/zRasB6siD5Ah0IgVVpMerwvrOZ0NkUx0T1I/vcC2gfodL9gKRtYwCGhFZM4RIgOgdiCa4KWkmoIHYpHMjE5EsIt1S3Mhxw8MNBjcQdSNRcDPCzRZqaYwYC4U+5JzcrBARg5u9uJmpCzfQoXwmUgYbVsrNTWc8yVM3qs1aI54kol/nyzk9H9z4E83l9a9/fRGgXHnlleWGNzYF559/frkZZ3PAq5124eaXyDX0FTfc8VQKG6+LL7649Cf9zc0nN6Q8zcC5FhPq0Fe8XvnKVxaBD0abyy67rHw3jGj0NedkrJIjnXM3phGbD8YEN9CMx/meNjjcoX6tRCZhA4KiHhESAjSi/cTTBoQ9xtjEZgWBVYQGbgXWCzZphALFGMp6wlhmrPEEA/lqO0lAA4y9WEdJf1eHeAqGuXXeeeeVNsOo2arhbe7A64eje9JQyWPdk+6aHE9v2HJc2tTTm3rn6V+EMwhoeJpoRv2MiIiIiEjb4JBaKDXNkQ42Avb2OL6e+tSnFhsFdh/2+uyNcCD+1m/9Vtn3kEaBp9mxfWBziGg12HdCVMMLWw8/2V+yt+UpdY5NdFX2nryHnQBnGvtPnHQrFYkWWxf7aQQmkRobmwMiGvZ/7Knf8Y53FJsVNi8eqqAstAf7YlJqY6OhrrRNpE1n/4d9C9tKnb0+37388stLVF8epuI42GMQFdG2iLhIy8HvVXse5yV1MGXArvDZz362POWPsxVHImWv83BeszaKaNeUIx6wIwIB/Yz96rWvfW2xA2FHWig9RzNwhBKRmz3zv//3/76If7Bv/Omf/mmpTzyUhi0JGxb/pgzssxmjfA87CN/BWUvkAexP2E3e+973lvcZnx/96EeLjQq7KxEOXvjCF5Y+533qGA8e0he0L1GHiHSwkON3qdCfiJ2w7WAzIyUXc4Z6MQ6JFkH/YvMhZUmICuhb+oM6NoIdjnozP7HrEL2CsUh/4dTmYTrGhCKaww/WX17NGMzj6tQ8Ty48aksa6O5KWI4Rz+zI4+eL929LV4zuTisd3zvSpxEdh+gl2BnnW4uYf6x1rDOMT9bZqCdzkXGOgIPxH1HUA9ZKhBLPetazykOaXEeY+4vZLFk/ED8i9GBeM8cXemi4sS4f+MAHHnQ/gM2PdT98LkRCwZZPvTkuwkzqxzWT+cj6EyngsI9TP77PdahabqKoYPtlfWXdIkIax6b8fO8lL3lJWbMoV4iAIrJWpJOq+gxC2El560RCZ22i3bkmvf3tby9l4zr1d3/3d6VOjUT6RvwZlJv+IKUg0Wdoj8Wuhay7XEPo/09/+tNlTZ/vQVPuL7iHCPFg1U8RD2bXrZ+INEcBjYisKbjJYYP0V3/1V2Vz/M53vrM4sOtuasJZzsarXSJFC5tuNqMf//jHm4Yy5EaNDeUnP/nJcgPHjVKrBiZuzEKEsRjcAHGDGCmHllLXlYZ244YYdTZGBAwLzQQvIXjiJpWbRzbLVYd7jIUwmkQ+2UizxPvNItLwfqRwIvwkcJPNTS0GqjgH5eYGPXIvs9lpFrmIm176hHQ3/+Jf/ItS9gc8BXHgSaGIeNNMzMVNL4YMbtIxyC0k5DpcoX5sADGSID6qI3DjM/QH/cc4iflZzadbbVvejzz39D1GmcWIp8gQOLFhCzAsYtRic9lp0IbUn7EYBl5yCzd7wi6eMHn3u999sP1Z41t5gpJepFd/beOWdHxff1rf05uu27c33TSxLw32dKenjzzYYDYxO5Pun55Me2am0+Tc6oWaFhERERGRlSXSAOOYYx+PPSD23OE0iqi+jbYc/o3DkH0178d+PdL0Nh6Pz+Io++u//uuy92EvhNAExyZ2C2wy7EvZ43z7298uzr1IuYTzi/0PNh4+i+CElOLsMf/gD/6gCBj4O/tTHP44MxEKIJ5BsMLe8zvf+c7BiKsQ6Z2jfo0PJ/A+79E2jXWPB5wi3Xm0IyIKHIPVfR7njhRe2DciFQZ2Hb7HAxbYwL7+9a8XBy/OT4QdHDui9yKAoTz8LfqC/XpEEKhG1uGzOJE/9rGPlfo/73nPK+Wh7uwpI3IPjlIEE1F3js9Dbzg4Kcfv//7vpze84Q0Ho+DQH9QP8Q/nD/tRpE2frw1jfIRDme9Q9z//8z9P73rXu0r/80AWD5YwJqgvTvGINMF3q23PeSJVFn+vnq86lvmJA53yfvCDHyzHp13/8A//ML3vfe876FjGER8RCBhzCEMYS//zf/7P9KY3vak4lv/kT/6k9CHjM1JpETGB9uDz2Edw6HJOnL2IaLBhUX4+G45YbKK0L+Mz5gXf4dzRftW6ROql6ONGYn7GmAD6NwRXnBvnP+djTHB++puH6BAUYb/jPJFWhbbH5lidz0CZ6RvmGjZaHPSR/gmbHXXDmb2S0Z06gRgPCCWq0L/YjhZ6ADBSG/GZqtgQYqw1rl/YhXpyv5+e5/ajB9elUwYG03Xjo+m6fJw7JvN8PdD3pPkeyevM+RuPSmet25DOHdmUspUx7SPSSj7up3bck364d1e6bXLlbavUgTULwSFrYkTKZh42rhG0IfMeYdjb3va29OY3v7lcQ7i+MJaZF40p9oC1ESEjYjHaHQENYpWFxBOswQhdsM+zNnBe1oJmIs2IPHbppZc+6D3mIQIe1kXmM9eLiNBCPakH5+Aax3WC8771rW89GG2L7+ODwebNuhVwvaHenBcRDesU6yDrWtjnv/rVrxaxCcfiXHye9/HLvOc97yn2ZtqMcnFNIbIXc592opwLwee5Dr/mNa8pqQB56JnrynOf+9wizgtxC2vPP/zDP5T7BOYC9ePzfIZ1mnWV8zIX4gFsRJgf+tCHikA3IoXRdowPzsH9RERCD2KuITKi/1gL/+iP/qjUj/qzJnIezhvjACGliCwNBTQisubgpgBHLTfQbMjZOEc40ZUmbuzYtHJjyia7brQEbmS42eOGBwMDNy7LDTfAKLUxvHBzXDeVyqEi1N9sijCwVEUudQgBRKOgovpvbla5KedJGgQ3qLC5Ga9z7Nh4LyZk4caWm042OGzouWluVv44Vog5GgU0zc5Zhc0D84HNRxgFjjQwirExYvOAIaMxr/xCRBuGGCn+VoX2Yk6zMQrjEUaourSS+ulIh/WRzR1jkT5io8t612wsx/uInTCCRY7eVsRgzCCeIHr4wFA6fWg4PWpwKJ3QP5C29M4v4GGWYCCZmJstTxmJiIiIiMiRAftrbAuxV8YZFs5C9n7xd5xIOP2q38M+wd4TJ1xEGuXF99j78x4/43jsJyP9BA9SsKchygcv9qF8DlsH9ggcd5E2g31TpP1h78Q+FBEGr0h3wX6K8mDjwd7A53AI4mSkfPEgUlXQQ9mwr2Afq4oQon6cE4co3298ep2yUheOW40MSpn5LKID9so4JiNCTjiAKR8PcsUT9PzE0Y2TjifmcfIiVoi0QHyH9uAYlDnKSt15n30h/cTvIbbgxfFCuMMxKQdtRBkpA852otBEqmzaBkcjZWO/j72GcsT+FFsObY6tIfoFRyaCE8rVGCk5xEExvgLakz7mWNjiIm10PMxFm1J+6k95qs7rcJKGA7VqHwrBUzUdDW1HZO5wqDJWcKpSP+odtqyqCIpjUz6c83wPm2SklOLzOFjpD+oWZeOcfAdHLOIjHlJinHK8eNCJcjDuI/oMZeRcjMvG9CUh0Aqhz3wRMGgr/o7dLuYt5YtyxnyNdmEsUwbGEY5hbKB8Jx4s5CdjhfEcDnTg39QZ2yniKtqQscM5GUshImIMHIlp0lcT+oqIXFUYm4wf+mGh77DuMf7oj+pDbsyBEDIGzOb+PD6OyvafM4dG0pnrRtIjB4bThp7uNDmbx13u9m3Tk6kvjxPEMw/NtqJnrNuYHju0Lh2ff8cmtB2RykRe50b3pHumJtPo7OrYVmPMM28iCjprHGM31gLGLTYy1ivmFp+L9EKMfdqItmJMYz+twtxhPWL94T3WtohSMh8IbpgPrGPAPGYtb/bgcMxv1u5GYg5yHOzl+FSqkdPoS9YefCyINPk8a0AIK3mP9Z02qAp5qA/nQzSCPZ61n7ZhvDCHY11jHse1kLamDRDNcC3g79SZNqfOiFo4HvcIi0Xpod0jfRNtTH04ZzyQG0S/hl060hny9xCA0t6RTom+jPSY4TOIKELMm0jDtNC6RDvzftQvshdE/Tgf9WN9ZI6JyNJQQCMia5JIycJNCU+fcFPA0wVLySfcDG4GueHkhg8HMU9y1BXQhNGFjR2bTm6w2NxxA7Ncwh9uirhZ48aSSCnccFVv2tYiYaDi5g5DAzenKLirgoeFWEgQUYU24ZiMF1IvMT4IQ0n71xE+VB3/C4kA4iaZCDDc4FbziM73+erflhIONjYSbAi4+UXQ1Syk5uEKGwhu7qkr8z02N3VYLKJR5BtmjPzjP/5jMUTyNBZjpFURV+PvnUg8sYewkU1hRFuqs87FExWMa9bJeNqr1voax8hmk4dl48czRzaUvhijPAt8h/RNe3i6lCcMjUAjIiIiInLEgDMOxzq2BpytYT8Cfud9HGoIBKopE8J+8LnPfa7YJ0JMwN4COxAPXSCawPFb/R7n4fWXf/mXRUDDnpJ9EPsZzoPAgD17NVIM5cEZiAMLcQLnwI7z4Q9/uIg8cCKGsxOnKTYG9sK8OBf2BxxljQ4wnIx8D5tHpBKqgjPxIx/5SPlco/Mauwa2rhBABCFeIcJKiDbY67GHC3EP36sKdvidspPOg/0hNjue7Ofv4fDkbzhKqTt2lUhXzve+8pWvlHoiPAnBBq8vfvGLpQ60Ge1Mn1EP2pj3aTte9FcIpDj23/7t35a/IwahbUKwgmOfPg9HKbYHHI+f+tSnDqYVaWwjysD3OUfAsXiPNqKeOCoRm3Bc6kv5KC82o4jOEhBFCFtVtHN1D8xnsYMQyYfvMGb5G3tmvkOdsKFRJ/5OmYh2EMdjDITAinZlfDGGcDbzHT5DnRGS0Och8AK+y+v9739/iUZBm+Og5jP8nYgRlK0qMmLsMfdIlUUfhzAJQshDhIpwIDfC8SgvfRDiN/79ta99rUTewTFOe0YaFspMXzH+qBM2UMpDOfgO8zH+RtvFQzr0K3OIMtI31Iu+iRRs2C8QwWHzbRwDUh/mJ/Ze0tu0QoijSE9WByxxJ2Vb0FPWrU+/ecwJ6eSBoSKmefzwSNrQ05eO6d2Tfrx3dzom2xIf2j+Yzlu/KZ278ai0nuhVeSzumJpM392T50H+zLf37CrRalbrMau4LjC+EbogdsCexnpSFQmFeI42YR1m3nNd4DpFGxOVhLVwvsgyrFfMcY7BuraYKAy7KEJJhI/Mc+ZkY7STxZjPhhdrF9cCbK3M4cbj0d+RagkhHG1BO4SwlLlYXZ8gIsD9t//230r0mUg7Rf1YQ/ge61QVzk3bcqyXv/zlZQ3le8x52gchEimSuM43CiirUH7WJ9YRyr0Q4fMIwSz1iAhZ8xHCPY4dolKutfQhZUPIyvEWigjEOs936TcijiHOYc2P+tEmROWhfVYq9aNIJ6GARkTWJNxEcPPFJpgLPlFoyFHLpm4lCPEMNytsbtl0srFq9WaDmxjCDnLDxIY6DCvLATeA3EixsWZDzw1SpB9a63DDSxtzk0woQzYCSxVDxc0sxgM2Egho2IiQ+osb5OXK0c4NMC/CK7JxwcBDSOBWRB7twEYBg8Jf/MVfFIPVkZw2iA0Umwhy2r7qVa8qxsTlEIexiWPsIYbj2BhICJlNTnAMKOa7bg/GJYIk1iSMWBgOeTKwGWx0+TyhWhnfYWSuA1v0GybG0l3Z8DGW15JhUt4tIp5COLNtaiLtmplOE0agERERERE5YsBehPMIRxKOdRxPISRhv44DDdtJpDkK4kl37EwRvaQasQLnE2KWiHDRCE4vnJR8JvaS1ZQ11XOxV+LvpKAhPQ1pHfg338XW9ZnPfKbsibApsE/iPRyB7F0jush8ZSDqMfsovoc9pDEdEE5K6jhf9NqIZsx5qo7bAPEQD+7wGY4fD5BESqNGx2k8sMLxKBc2kkirRNkjrUR5+OFA+pwQeuAghLC3BNQbAQ3OzW984xvlb9FXEKlQqtFGImoMfYjthL6JVEmNUXoQvIRIqnqMgDZFYBXHrdaVF3XCVhjp4+MhE87D2IsHfKoObJyZQDs0RqDBDsL+mvJH/SOqDGMbG2WIZWKMfelLXzrYrtXoRMDYx9lLn1C+SKtE+RZykFMfhDmMvcXaDti/00Y8ANXYdxExGwFNnLcRxif9z3n4btQ3bF60H21XrRPzEmc4AoRq+eg/xC+Mh0jNVZ0z8TAV/Rlp1CPqR0SlmK+OsvZAOPOs9RvTyzYfnR4xOJz60/61aUMeDy/YeFR5/9YNR6WjB/pKyu+H9Q8Ve1F5sCr371/de2f63t7d6cZsU5pcZfsQ45n5iy3/wgsvLLb8V7/61emiiy56QASUxnnPuGa8x7xvjMoTIFTD3gmsCVx75iMiPZGCjnRLCByxpyN6WeocYB5je2VdYF5Fnasw95iviCdj/YyUfovNQ47N9xC9ILCLNWCh6zRtxHqBCJG1BhEnL9ozbM+sU83qzPv0z9///d+XOi1G3GvwQiiLX2khe3NcSyJKUFzvuScIqgLeRvgO1zDqwNqNH4QXfctY4Lt16ici9VBAIyJrlggPyM0chgoMIK973esOhkuNm8l2jw2xyeIGk5tZnjhi48/mcaF8oc3gWHwXEc4555xTRD8IAiI8XytRLGIzzotNN4YMnqDhRqvd8h0KuHHGKIDxiBtexFCkW6L/6qYyCiIlTzzZQr+xCadNCPfLsRDo0Ob83myMxMY+xsFCN+7caGPs4kacm1OedEEQRESaMJIsJUJJ3ERH2F6MRtSNjVP1qZ4jkdj8ML5pTzYDbCgZK+3MmcirzaaFOY2ojQ0EBi02ThiGyBGM6KNqGFyIqtEpnoTqZGgPjHIYbi+55JKyziEWXCwaEPA+T8Eh/DvrrLNKW2IEm88IMB97Z2fS/fmzW3PfnpzX04WYOJDb+q7JqSKkcdsoIiIiIvLPsJ9hz8X+hn1Ts/v4dmD/3BiJY7mIfTOv+Zx0zc45n4NxoeNViT1hpLNZjEh/y56JJ8SJUIxtiP0u9i32p5wPxxwP/2CHor3mi9pRpdleNKKctPN+iIFaSrV7wG7Hq/EBtIX6oVF40Xi8eL9OO1fLHnaFZuUN289CLBaVYLHxtVCdFosGEc7T+aINRzs0tutix6MNWn0QcLH+mO/4i7Uz7y3Wfgudq915t1i5Q5CwkDO60+06hwNcmXqzve7RQ8Pp8UMj6YS+gTSQ/tmG3EOkj2zTG+jqLq+Rnt40mK9nQ/nv2IW2T0+mmyfG00/27cn2IR6wmkmr/XhVjEMEYkSWIarME5/4xGLrjbRL1c+2ugbDYutZgG0cexwCHh4oROyCnR5B53IQa+NC8z/8MO2kTAtxSt1rQrQj9zlcUxGXUP8Qg9YVl4T/oZUytxP1hfLW6cP4bKyj2GWpW7v1E5HmKKARWUViI8NFsU5ovMjJWncjE7DxYoNQ98l+PtvOBbbxRm8xqEuEs2slLCBl4oYuwuLi/CZ6BEppXjjAMThwoxCO8HiyoHociI0ex4wnE7jZ4Ng41lFecwPLkzDNjBaLERs7IjRQZ54k4bwhtsA4UlVbV8taLWPcqNE/CCi+/OUvlzbgRR9zjrr9HGOimmN1ISKHM8et01cxfkI5PR+cl+PxFEyEnuVvCKFok7jhi/6rChoa24S2QODEzT59hrCKfqQMPEVE+3KOiIrB8Rkj1eOGWCXmZOTvJnJQY77qICLCcH5CMaKAR8yFECjGISKp6NuoC1TrUx2PMcY5H30UKcR4qgq1PKIpxEF1jI5hoKs7JyHWlzppdKrlD2NWnXNVhUkLjafoD+pKW2JMJHIT7Utbh5p+PsFVtGGMkxBX8eQVT2ZhsMQYGesPx0GYxIaRKDeEpub4860bMeboF47J+Ihc6Y1EjnvapFlkIvozhHattH0dwgBH31LmOmNnvqdDmsGxWSsR0DDfMAqzPtcpH3OTecMTgsxZzl/n+oMYhqeHdkwvLKApT6Llz+2Ymc6GkrF0ZCY9ExERERFpH/a/kfaI/ddKRObkyW32dZ3qpI79KQ+J0A7se9797neXtBm0N/u0sAnw+t//+3+XfolIJCIinU53tv0N5tdThtenJw6PpC29D4xknq2DabirJw339qTNB96bO5CeCdvRdWP70td2bk/fH91TotEcCllBrPHYwxFSYqM+99xzywOaXB+vvvrqtBpg7yRa+5lnnllSGhHhC7tzY6q/I4k6gtrDmSO9fiJrAQU0IqsIN0aRu7eOoxGlbORubAUiZGAMwalZB0KQ4hBu1bDBxh6Hch0wGPD5xlCcdcCxGrl5yQWKU52czK94xSsOpg/ZuHFjeeEcDyFDUA0hixMfxy8v2omcuTjXuXFd7igf9DWhQikP6YWInkOUBnKN0jdE14hXlDPKiKgjcgtzk00IQKJoVEHAEfmDm8FxGRPUe74nW4IQICASoC3rjFPGKGO12U1b5EP+/Oc/X4xICILe+MY3lrQ6hCymTeg3zhtiqBAvIAbAmETZCHNJZBHCQzb2GeXgPUQ1fBYn/RlnnFGEOnFsjlsVrCCeIgoGkY4QXHCuheZC5D7/xCc+UdJoIcJ4y1veUs6DEKNaD/o9IqjM1xahDKeclBsDI2VBNIOQi1CMrYjn+Cxjou6cBAQQdYVSQSjj6fc656KulKvOGsP7EVKaPLO0LU9mIJaLnNX0YczvmNuMDdqTtiRyD3OazSB9WoU+p43JCY9QiihF559/fllPOGaEAw2RXcxDvoMQ5+/+7u8WFNDQh8wx1qFmUXMYf1HmVgWSzeCYrG3kvaWcsb4sBnVaLKfvfND2nIfc5xgAaFvasS4IClkPWXtptzrsm51Ju2an0o7pyQXLBHdPTqQbxkbTlaP1xWQiIiIiIp0C99+8PvWpTyVZWdhTsr/nRYoG9rU8JIKNgr0gtjIeomnlQRgRkU5gllRiPGw3PpZO7h9Mx/f1pz7sbQt8fvTAA1fXjO1Lf73t7nTz+L502+TaEHFiayZSPamIsEVir2vV37MUsJdhM/2Lv/iLcu3hHoAyGa1ERGRhuN6sduQykY6FKAdEVcDRXoeIkMKrlc00G3I240QEqAM3TCHUaSXUHCls6p4jIi7gsF/qDRqiDtoSoQLtSRlQUdOuvEcEEp6iCiKvbkTMwDiB8IIXjnEc2RENYiXAIU95jz/++CL2QQCEaARHO2XH+QxxM4vIhBtp+oQb2hCoYFipQthFvl/HQR6RVhAxheN+obLSdpSPdqwTyhnRA22JAKRuOEXag3LjRKdN6EvOybnpw0h3FdFLQmDCT6Kz8JPzztdnIV5AdEGb8xNHPe0cgpaqSAm1P8dmbEYY5ToiL9qK44Vohnow9xAREJKTOoaoC0EQPyN3d0Q0iboRTQcxQtQxIoe0IjajPMwD2rQu9FuMrboiGtqWcUf0FurcjBCGIQiiXnVCX9JHCJCoD2sZbfyIRzyitCftytiMY9OXCHQ4drQlaybtuVAkKerAMXmxbpADmPHB8emriLDDMRDCMTaYO8zFxrzaAWnDIupRnZRQHAcB0kLhmtsl8vvyRAl1qTOH6X9ekYe+VVjTGPPRL3VgvDHeo+/qjPWje3rTizYclc7fuDldeNQxD3o/njT6zPb70nf37EoX78pje1ZjgIiIiIiIrA2wIbDXZV8b0WjZI/sUuYjIg8Gi9YSh4fSc9ZvTCzduSWdkuxPpmnoO2N2miMadX7dnu9ovx0bzz/H0o9G96adje9PumemSCnytgH0OOx22w7AFrpaIJuz9ETEbO1yrEclFRDoNBTQiqwhO1WqqoWZUU4i0EiEiUgM1SyMSRHqcCDFbl0idVBeOzc3ZcqmbaUMcthgeEC5wA1o1RgTRhpHGCKc4LxzG7eTebBf6BGEITnvEByH0ibJGjs5IKYRjGUHAQmm8qilt6hDtH6mLFiLGaN086HG8dtLRRJQb2oI24Xf6LyLF0G8hdInIQY1CooWI8YEoAhFNpAGiXrRzpNxB2MHPdvKUVuvBueJJMn6nr/lJW1YFNDEW6deIrEM0lMir2socbIS+o/3qEinVWp2Tkaaqlfkfc7+V+tFX9BvjAjFNiKuqEWho0xDmMDYQz9RNFUefcHzEaCHMoU6RDouNLGtF5KhfDPo41t46RNkXS33WDpHiKuZQnfUh+qXdaDjtjAeIa07dTTsCmhdng8kLNmxOFxx19IPeH8uGke25Tf/8ntvTz/aNpquzwUQztIiIiIiIiIjI4cn6bGc7c3gkXbDx6PS8jZvTpmwb6u/uSrNz+yMV7802rV9km+CVo7vTLRPj6Yr8k4epZnV7iojIElBAIyIisoIgqAhB20oIJkQ6heN6+9IFm7akF24kCs2DUxQSqvfK0T3pP93xq3QXabKMPiMiIiIiIiIiclgz1NWdNmW76rPWb0on9vano/Lve7LN546J8bQ1239umhxP905NpvE5ZTMiIrI81AtPISIiIm0RUTYiyoviGZH22NTXm47vG0inDAyVXNgzpMLKxpG9eX5dtXdPumZ8X/rirm3plsmJNOU8ExERERERERE57JnMtp/t09Pp8j07U3/qTgPd3dnuM1si0EyQ3j3/PnkgrbeIiMhyoIBGRERkFVA4I7I01nWRImou7ZqZSteOzaTd2XiyOxtLbhwfy//em26fnCjheqfmDK8oIiIiIiIiInIkwCOJM3OzJcpMd+pKJE9HLjOdtP+IiMjKoIBGRERERNY05Bwd7u4qEWdI1YR45u7JyWw8mUrf27sz3TI5nkaJ9JRERERERERERORIY7a8lMyIiMjKgz/CK46IiIiIrGk2dneXm1ZEMuOkRkvexIqIiIiIiIiIiIiIyPKhgEZERERE1jx9B35y4zqdRERERERERERERERElhcFNCIiIiIiIiIiIiIiIiIiIiLS0XQnEREREREREREREREREREREZEORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHU1vEpFDQteBV09XV5qbSyn/P83m/86l5aP7wCt1dZV/z87tP/5ynIPjdi3w3lzlVYeuymsx9rdRa8dMTb5TVRHONjnOUtuuq/Kzbj0Wo7vhuEGr7T8fzfqklb5YDqpl6WooR/xca+M6jpdqfq/dsVanr1otd9350y7/3M5dZXmaO7A2LfVcC7XFcoyTOG47fdPOeVdqDnbXKE+ct9Xjr8RaLiIiIiIiIiIiIiIisloooBFZRcKxeHxvf9rc25uO7u1LW/Lvk3Ozad/sTLprcjJtn55Ku2en08Rce27envwa6elJ67p70sP7B9NQ/r2ve/+Zd0zuP/Z9+Ry7ZqbTTD5Hq07M/uztHunqTo8cGEr93d2pt+vBrtL78/HvO/CabnK8dfkYw1096fSBwXKs7q75Xa/js7NpPLfTteP70lT+90yT9jm2p6+08Uhuh5smx3L7zj6gTQfyeYbze4/K5x3Pf981M5Nunhx/wDH68mc29/SmE/v6y/m3z0ylHdO53VLr4LQ+NZ9rOLcdpbh9aiKN5WNOzrXrzk+lf4/PZetraLM9eSyN5vqM5uPfPT2Z22q/OKsOHKkv//ch/f1pY677pp4HXyamcpn35nP8dGw0rRZH5XIcw3zJPxl3AeOLucNrR67z7jyup3P5plpsV+rNmDi1byBtzOcZ6n5wgLbJ3J535n67c2qyjMHFYCwzFx+V5wnjZSJ/98aG8VWFeUD9jspjclseY9tzPUbnms9Oyrwht8nD8jhYl+d6zzzShXunptJducw7Z5vNxn8u+3G5LIx7yn11nnPLIU6iPQZz/ejL4/Kx1+c68++uvD7tyXXenV93TE+kfbkfmRetzrP+PLc25eOd2j/wgLWJsk/l/zInaFfWvj3591bqNJKPd3ReU9bnNmatuJ9jzC5cQs68IX92fS7PcXmNv2NqPK+L02myxrn4LqOP9mdMbFxgDlKfa8p6WG8dH2TNy210+uBwKTttcW8eF43twLWD+rK+3JrH7O58nr01xiLXBtYLvtff3TXvWNxf9tm0Nx/ztsmJUo5mc0lERERERERERERERGS1UEAjssp0F3HCYDo5O3lPHxxKpw2sS6PZsX3/zFT6p9G96ZfZIToxhdijHZnGfuf3xgMO6meu25A29vWl4R5cmV3pprGx7EifSLPjo2ksOy7H2xBv9Kf9opKnDa8vQp2BeYQGN0+MFcfu/QfEDIuBeAYn8dNzWQcXEOTAznwsXrdkh+5sduo3a51j8zERrByf63//7FSanpp6gIAGZ/tRvb3prHXr04583Dvz+40CGhzCx+bvnzG0rpz7hvw2zvOZNsQZiAcensuDEx5By+7iwM8O9Zn2+jkdON6ZuWwIgarcOz1VHOPb8k+c5LnH02zNIlNW6n1qHqMP7RtIJ+dzNIIY6Z587NUV0PSl0weGinCLcQdUCUHCtpnJtCOX58aJiTzeZkv5WhXQMIoRozw6H/+huc6b8/hpBKf/j0Z3p601BDT7xSLd6fGD63IZZ4tg46Y8vhYqFQKak/OcPS2f/7o8TxGLjc7UENAU4U1vetLwSBHkDXQ9eD5evW9fXmNmagtoWC1OyuvTk4dGiiDp58smoOkq9XxoHluPHxwu4q9Nfb2pO5f5rtx3d01OpPGx2bQtn2xmtvV5hpDsmN7+9NQ8pxGuxNpErZn7905PpF9NjKfb86BBfNLKzBvp7k0Py21yfJ4Td+Q1dGZyrrmAJpeBdnxCHgNTe2fSaE0BDXBz9tBcl0fndnrofHMwl39rHvM35bV2tqZAjrGBeOmsvHYjrLsxf5ex3FgL+oh17+zcjohdZucm8thvPhb7uvaLwJ46kts/r+v9C6zlXHvuRjyTxxbjfGpuOUaXiIiIiIiIiIiIiIjI0lFAI7KK8HQ+ju7fPu4hxWG/LTsxrxvfm/+Oo7U/XbD55PSz0b3pe3t2pb/bcV9xLtaNEIPwBIflS486Kj193cZ0RnZ+3z45WRykO7OjFYf+k9evT+f2bC5RWf5++33ph3t3Zef4aKrnVt8PUS5Ozk7+txx3YrotO2CJmnPvzAPlBLM4rrMztXt/bpZFj0f9OP8UEQvyi8gRREh4fG4nor58a/f9RWwyPduVprvqJAfZz77Z6fS44XXpxZu25O91p+/s2Zn25PKmA0c4LjuInzmyIf3eiSen+3Ib/WJsb/kMzuQo8caevvSU3JbvOPbE9Jnt9xaRzUwbvl765hEDA+l3c78/dmhdGsv9+sd33ZJ+vm80n3dfapdnbticXpRfCJVuHN8vkoAzBwf3RzfK5f9/2+5N3x/dVRztdaLddBFhKPfxOes3Zef9uhLF58p9u4vYKr49Qwt2p1XloXnMPW/jlnT+xs3pyzu35jacKwKLgfzeY/tGSpmP6RvI7TBa2pVxc+vURO3jUx2ii5x/1Jb0sP6h8rcfjO5+wGem57rSTB6jszXGNeNkcnYuPXx4OJ2RxyFj4Dt5Xo8vEC3kzOH16QW5L5+8bn36o9tvSnP1hnmZy48YGk6vPfr4tGt6Om3NawrRZqoQ4aXmtCkQserRucyvPfq4dG+e35/Zue1giqV2oO7H9yLI2JDOGtmYx+2mdFse95QV8Rpr06l5fpw9sj69uff4dPnunelnY3vSV3fuKGtD3fMSNei03BZvPObEvHbMpOvGRtOevA6wDrGunNW7Pg3nNfjOyYn0ka13pZ/s21tbRHjy4FB6/ZYT0rnrN5R181t5rfh4XhNmFyjf0fk8z8v9+cKNR6Xn5xd9inhx72zzFb1EgcrlfWI+F8c4uX8wXbJ7RxGGBczBudmuIj7qYtWqUY0SHSbPo9/MazdrxQ/27kzd2+4rEYaqa8OWvDY+Kl8//sVxJ5XyTue37plpfpWYK5LAuSIum8oTinbnfJT/mHzMb5a1fDp/ZjbPo+48xqsJrkRERERERERERERERA49CmhEVhGiWjxjZFN5qp9ICJdlhyJO1ZGunvLEP9Fahrt706nZWUt6k6mZuVqRBXD+8+Q/EUmeNbK5RDX55q4d2UG8PwrMWP43nzl+YG86oW+giDieNrKhnI84KDhQ2+HmXIcr9u5O1008MHIL4pWd+ZwTNZzFe/Nnp6bm0qW5vL3ZGYwTfN+G2fSw7Hglqsg3chvdMzWVxvLnJg+kLZmu0SYlDQ5pYfLnH0q6mJ6e0gaUqO9A2psT8t8ROfR395S+IbLOnkpkHiLUbDyQAmvb1GTaS9qrNpy9nO8JwyPFiT9R0kVNp+N7B9LdvVN5ER6rVZ/5QNSAQ/q63M//uGdHLuN+IdNIb096zPBweszgunTupk3pvpmJtDWPs20tRrshMtL28cn01V33l+gr8W1kXftmW03+tXz8Yx4ru/L5x3LfhfCFvnt4njdPyeOa6EKkoPmrrXeX+dNqSXfP7E95dNH92x/w95m5/Wm86giRGCf0zw15bp2axzKCLaL6/IrUXZV0OJGuh7Q3RIraNb3/3KNtRCb65di+kuLs6obIQIwRopUcCiKyD8LBs0c2FkHWJfdvS9fmMm4tqeRmioBmfzq7vnT+pi1FdIHg4uejo+mu6cm20tndPjmevrZzW7pver+Ahjl8Qm9/KQPRqZ46vL5EYJk9kC6qLoO5j47rH0iPOhD5ib6cL8rWMXltYa19SP9AWgqU7b48r7+68/4SBStgDpICjtRl7awfG3sR0wync/L1iJRkO/JxJpc4p+mnu/OxvrF7ZxFzIu05Z/2GUjr+fVn+O31+f25z1nPW58m5Q7eOiIiIiIiIiIiIiIiINKKARmQVGcxO3NOHhotznXQiPx7dnXZkZ+IQqYKm+kqKkMeu25CGenrL5OzJ3vWpGr5RnJM4oB87OJJOzE7bX0ztTT8Z3Zuu2Le3pMnACYuj/qjsvD8+nwOH9Us2HZ0eOTiUds1OlRQt0Kob9r7JyXTj+Fi6erz9VD44XSfmptPu8f3OYSJqkNpqb3Gyzqbr8vFxhk+36ETfkx2zpKyh/oiLhnHo5tdsPg6CFlK8HNs7UAQztM1QV3eJ0EBbjR9In7UhO8tJZ0K0kV35WGOzrYsaug5Evzitf7hETEGEgwMZgQDpVCjL9FybApqUynfvyU7ra8f2pTsOpKAaIsVRrhQO/tdsOTYds6s3/57r0aIog2Nvzc57jr1zZiq1n2xqebkuj1ec76MHxvVQV0/pO6JlPGnd+hLNifQ5f7vtnpIyp1UBBuIgxEhXj+1N7cIZaa/bJybSaO7z7tzfDxsYSHdOT6axSnF6EHfkn6T66c212Y7AYHqqJVFHQJvcxHxcQrmXG+rHnH7M0LqSDowxdeXonnRdHlP3zUyWPmM92pQ/synP00fnzz12eF06rru/RALaSgqyNtLZldRTef27M7clczDSOxE9CwHNI0gFls9JX7fS1l25ZzflvnxI7kvWhumZuQcIWEqgH86V12Hm+OZ8zhK9p805znpF+q/rxkeXTQRFWYgqQ3s/Nl+Pjt7Tl/ZNzZbIMUuJBTNTBH0z+fXPgkzm4qm5H0dze9yQxybpr3bOtBLzTEREREREREREREREZPVQQCOyihBh5Zj+vnTn5Fhx8EY6D9LR3DY1mf5m271pYMfWhBuzGvGjGQhBnjy8Ib12y7Hph3t2llQZ3927K002fA4HLFFdbh4bTacNDaRT8usJI8eni+/fniZK+o0jB1r2zsnJIsAh+gUO7Y3dY2l7bvf1Pb3p+L7B7KwfSV/dsS09Ymgo90t/enJJz7I77ZrY3/KnZCc5UWhuQ8QzMV6iZbQKwp1j8/nOHtmQbhrfl36Sj7FvZjY9aWR9EVb8aLS3RIBol7kDr6k8huIoRCBCuDHU3VOiG23s7i0Rd9LUoYlCspJQ931zM2lseibdu2cire/rTs9YtyFduOnodGbu99smJ/Lcqp/Kabm5anRPenrue4RtL9i4Jd04OV7GVwgV1uX+IRLS09dvKtFqrhjdW4RBR0pcDkRiRLx6+VHHpG/t2lHSM309r1HV1EzMqu2zM2n75Ez60Na705u2HJeeum4kvTmvZ/fcO5F+eSD1WivMkkIrHZgTzA1eeRzcnOcy6aROQADT05P681wZbaG1d+e5uy7P6UcPDqWH9w+U/hyb/ufvIxgi4s6z81py2uBwEe9MLiH91XITwq6f7N2TeknVtW5dOiu39dzoXLp2ZsxkSiIiIiIiIiIiIiIi0tEooBFZRUazk/gX+/Zm5+twesrwhrRr02y6Zmxv2pud/3tmp0s0hJnZuYNOzrps7O1JR/X1lvQopHC5PTuKFxLD4OpFsEOEmuGu3vSQvqHi3L93ZirtbjHCCumWcJAf0/PPSwmlJ6pOCDsOJVunJktamxds3JxOyM5u0mQhoNmYy0ub4ey+bO+uNNE1l87o6U6PGhhO1+fP33Lg+4/I/US0itsmxtP2kkaqdQHNif2DJcoDAp2Ld+1It2aHO1EqnrphQ0nzclp+fykCmvnozfWijif29KdxBAKkemlD/NOTS0qUjaOJlJPSwfRVkyVq0OzBVFdrgZgzv9w3lrZ096dtI9PpjJGRNL43tSygof2I2FMd10C6HqLZTLVQbyQJN07sK+mZzhnZmE7Kfb4jj6XtByIfcZ4T89jkfcbmz8dG2470gyCENaCx3PeX1GOHZj4SxenE3v5y8vump0pfVMUzjdwznedsbq/B3u50zroNZX0ZzC01vsTSd+X/bezuSVvyGjCU24i0SKy7Ey2mLbpvcqJEnBnPY+GCzUenL+7cnrZN7zkowWFNPKF3oETSmZvrKmmonrRuXdtp2rrzIBns6k5bevqKECiYPiAKGm0zBRKpAxFx3j45ls7K4xJp3f25PUiZJSIiIiIiIiIiIiIi0qkooBFZRfZlp/kvs4P85L7B4hR93NBwGsh/3zE9XVK33JtfiGz2tijU4FjD+UWaku0zU0WIs5BbNYQG905OFVFFf/4eTu4ds63HnyEFyKmDgwcd/rNpfzqTH4/uWdRJvlqQ+oR2LWlkerrT+u79S97GXN/1+TWZnc93Zkfy3ZOT6SH900UsQzuSEov221xSaXUVZzsilFZbqDt/l2Oc0DdQykCqJcQ4/dkrPpOPR6SKk/sHUxrdndqlt9Stp4hxSiqoIv7oSqfk4z5sYLBEHdo5vX9MtEpfd3cRHJDqi7ESR2CM0a53Ta+9iDZEWCJt13hJk9VfRCWtMpDHwNG53o8bXPeAv985PbG/PVsQI9Fmd+d+3zgxli7ctCUdm8u0uXeyRFsp6acQ0OS/jec5v6tEiGpfwEAaN8bTeEP5rty3OyEhmlxlwRP1Y20iXdrUgVRERN1arBQIU3bk/iPND+Oa9mE+tirWGshz4CH9A6nvgJgIMRiRZ048kMLuzsmJMidaTZ+GYGVPXq9J6XZaXr+P2rsrrct13HNAyELaNFLx8ZPP3ZvXjjPXrWt7LaTctMMj8lym/AHnv580Zm1GV6Lu9+ZxeefkXDp987p0Uh43D8/z/O69k/vTUImIiIiIiIiIiIiIiHQgCmhEVhGimPzD/dvScFdPOmVgKD11eEN64YbNRYyAiOMXY6PpJ6N70g3Z2b51pp5cA2fnuuws7s+/TM/Opcnsx52p4a0l2sB4dqIS4WBTX1/qb0MM8ZSRkfSYoaG0+4DDHgf92Mz+KDs4vA9d4pz97M5O5runJ3M959L6rt60pbe3tBcO7g3ZwY1YgbYnrQsRHp4+sj4dkz+zMTvtqdHm7LCmVa7P/UGKq1YlKDj+H9I3UF67srP7ruy0v32S1Epd6e6JySLiOWf9pvSx++9L7UDfDfd0p0cMDabnzGzM55gpgpqTBvvSIweG06n9Q+nS3dvTrdnJvquN6Dk47h8+uK6ksapGXblqdG/6wd7d6a7pXWmtQZQgXoijNnX3psGu1uUAx/b3p9O6h9PRPX0P+Ps/7NpexGE7Z1pLKXTd2FieF7NpKLfn6UMjeVzOltQ/9NXxeWwQjeqW8X15fIznedm+KOnJeT4+bngo3T+18QF//3e37SvryWrHFulO+wUlIz29ZS7uK/3SfHFCALVzmvWvK4/v3jSACGq6tdlH+qTXbjnuYJq80tY9/Xks96WteR3+4Z5d+b3pliPDICS7Ka8HRLb61yc+JJ2S+++Wvv70y9x3QDquZ2/clO6Z3C/MuyO/XrL5qNQuA3ktQgj3tmOOf0DbXZvPf+W+PemWXe2tsgiHbstrEGnDnrFuU3poXhNftnlLnte7FNCIiIiIiIiIiIiIiEjHooBGZBXBAbo1O2A/veO+tC47ljf29qZHZMflSfl1+uC69OZjTkjPHNmUvrd3Z/rY9ntK1JM6sodZHKuz+53ETOo6DlAiNPR2d5fUJnx/ro0YCb8cy47k7IC97YDzeHaOOs6kfXOti01WgqlcoN3TU+mX+/YWR/TxfYMlZc5jhkfS0dnRfdPEeIl2ceP4aBrMjfay7Oh+SP9gdr5P5bbsLtEf7pvEyTzWVvSO43r7c78Ol2gw388O+10z+0UE++a60rUT+9Ljhtalp45sKFGIkAu0KnHpyv09lMfRQwZI1TRcotycODhQImJctW80fWTb3enru+8vIqF20i3tnp5OV+3dk7688/60Z3bm4BjhePdNrc1UL2UO5LHdnX8SM2e2jXG9fXoyXT+1L31+x7YH/P3mybH8XuuRmogodW/+HuK4h+Rxt2dgKH0vj0PkOSf29aYz14+kT269J4/D8bRztv2Zc2Xuq1+N75+TVVhzxg9BOChOOZ17YCLNlv7gVWdt2v/Z7rQU+vL3R3r6UteBWYUA7Jo8527euS/dkec9v4/NzbUVGYaIQlfmvrwut/OJA4PpaSMb0y93jOd515VO6utLT123Pn12670lJV5XV+sRkKqM5fFwax4Xf7dj6wFR0X7un5lK25YYAYo0bFvzcT674970wk1b0nkbN6XnbdjcdgoxERERERERERERERGRwx0FNCKrSM8BgQupTHCMEhVkIv++LTtGd8/Mpo3Zub6xtyc9YnC4pP4Zn5tKM02ED7xLWpF9c4ht5krUkGZRN3iX6CpD2clMJIJduQxTbbiSSZdDSqJfTuyPyIEQZ+aAeGYtCGgQTxBlB4f5lr6BdGx2bm/q7inRZnCt3zs5UcpLlIrtM9Ml2gxRYUipM9Lbmx3Mc+XvOKrbqc/mfIyj8jl5TY3PFUHNAa1TiU7Da113d4lGFOdpCQRLlD2Pn6vHRksKr/H8xzOHRkq9dmTnOCmHxmZn2xIKcAyEM7dMjhXxT7TBWB5re2fXppud8b9/DnSnbVP7694qjBkiBt008cBIM/cXAVTrx6PtiYiDuIU0Ocfk8cD829TTXaLdILG4bWKipC2amWtf6UKZ75yafFC5GcczhyChGmdEuLVvdjqvNV35tb9fFoO22Jzn55YDUY+IJjTRRpsjNrl6354ikAPEfcyTeyfH09bcRuNtimdgqtRpNt04ti9tzOv0I3Kfbu7uLULIhwwMlsg7RJqay3Xe2Ls0IRCl5Fw3I/arrA+kuto3s7Q5SKsy3m4jMlY+/t355xPXjeQ2mkw93Usrt4iIiIiIiIiIiIiIyOGIAhqRVQSXJM79yezNxYG7a3p/FIFrs8P7yn17S5STlx91dHGyH9fXn52/MyWiSzN24fDPDtXJ7BI9Ojt0OUfXVJrXQdx14EVaIVKr4Ay+D6HBTOtOalJS3Tg+ln42PprWIrjOEXvcOLEvHTOwP9LPCb196cT82pOd+rdmZzq1RoC0Pf97b5pJI3296ZQ0lE7Mn5/MLYgg4Z7p9qKtINjhdUx/XxHLPHpwOJ3cP1jew+FOpBj+ThSan+X+b1VAQ/+O5bF048RE+tLOHUWk8YShkfSYE9al6bn9EY/2zrQvneCbiDJumUTcMXVYRKbYkufN5p7+MgcQBuxqI2IM8xMxy68ORFZaDphnV4+OpkcODafj8zg8rr8/PWpwsIi1pmYYo6MHxR7tghCONGHLWe6lUMR9uU4IP1hrNuXXhp7FbzsQgZ2Q58xpeZ6w9u3K425fG2Kt2/KaetGO+9Kdlf6fS2lZZESIThAcEvHngk1b0sOHh9JJuR+fPLw+ndo/XNZhRGfre/rSxt6+tBQQ/ozldmCt2rrEiDMLcdvURPrF+L60cbQvPW/95nT1vtF8TVnaWBQRERERERERERERETkcUUAjsoo8NDuF/79jTyyRT64bG02X7dlVIscg4kCssS07m/dmj+n67rk8ObtrpTsB0un8cnw0/WDP7vSyzcemddlJjZP32oZIFAh4NvT0pEcNDKWXZscvUUS+l8twx/REOlKZmsNBPJXOzq358IHB9Iotx6Wu7q50477xdEV2gO//DEKRmfSj3bvTUb296ZR169NDBgbSl3ZsT9ePtS4OIooG0YZecdSWdFRub4RSRBo5uu+BzvTu7u4Seea5I5vS+MxMiRzSboQTvnVHHlf35NfLt2xJJ+XzveGoY9NPcx2JvIFI6EgG4cWG7p70axu3pEcNDuf26Erf2LmjRBdaC5Au54p9u9M50xvT0XmMPWPdSHrG+s1pOpfvF2N70x15Dk/PrX6UmJVme55X1xOlKs+jxw4Pp/68CN01NVGi+UxV6tt94HXehk3p6SPr0yl5/v3t1v+/vXvpjfM67wB+OBwOh0PqLlmWKlu+pbbjJnHgFnaNFgiy6qKLot30KxRov0CL7roo0O/QVbeFkaW7cpKihYvablE0qpzYkSxHsnWleJsLyZme552ZiJSZeIaklMTn97MHkizynXfOe86RgPP389zIc7qX9hPlGK+JR/n0f7iynL7RWkoXm830F2d/Kz2Tf4wA01u3b6bP8pqbq/3m/BXrf9ZX05X8jN5cOpa+tbSUWrO1qt3d7MR/CgEAAAAAAPzmE6CBxy2f7H49H/DHgX+0bvppt50PWmtVK5CvL7SqiiTRfiTa70x6oB4tWqLtxgf5EPSpuWY+fG7mg+gTKa3lf/MBdrcKT8zkg/u59ORcI/1ePqCO0+prnU56f301fZVF86KVCCblVxwFRxWYzmA73etvVtVpQozyZv75za1eFZyJ8Em0kYkKO3f2UX0mnm20qrmQn0VUMvmo20nfX11Og4ee57n8Pi9tLqZnGs0qXBPtpTYOEPiIq0etjg/WVtO3WkeqefDc/EL+bBupvdWfOkwQEa5GnptROaSW0q42QBHQuv8rauMUIbCozNHM9xBjHe22jufXC3kco8JPzPd/X7uf1vv9Kpg2rQg/NfPnPvlQtZR4z7h2dzD9WMajj0oqEXCKdkYvLiymJ+qNqgXaj9ob1Vo/aNijWZupxubh+47KRFHxaj8BnXq+15O1etpKD1oebVZjMKgqHH2ZeO97eT97b30lPZ/X3vn8fL579Hi63G5X4bFoQ5Rvu1pvMc/eWDpWhTY+yXvT5c7GgdbDoxZz61qvkz7uNNLL+XnGKom9JqpybR5SYC32rJjjx0ehyLH4aazHCEEeRmWdXhq2sos/D77RWszrqZnX/kyakZ8BAAAAAAAKIkADj1EcvK/mA9bfXTySFvOBfzufgs7nE8qF2mw63Wik38mHsBGyuLHZTbe3elWbkImumw8+P83fM1gb5GsfTWfytZ7Mr87Mdvq826va+Mzkw92no4XRfCO9eeRYdah9KR9Qv7u2kqY3qO7zUdXLGF57eP3BAatyxHfHZ703an/ycj4cfmf1btUOpTM65K4qAA2iMkYvvVGrpSfmGmlhpp5u5V/f2py+bUqEL47lZ3p+bj79OB+m/2c+lH57+c4XPsv5/DxutjbT6+efroJN0dbn+hRtWh4eo3GA5t211Sqc8UqeT9HSKap9RHug7oRjOX62VXgmginzzTxvH8Rn+vn3Yy7/12Nu3VXdV35FMGitPgxwLMzU0qk8bqfm5tJrrVZVNeNKt5v+de1+Whv0p5qjMTyDUSgnwmYvzrd2/X6vPwxZfb69OVF4ZNe18z8RFolgyKnZufTG0WPpeK2eLrfzOLbX0kEa5oznwJl8z0/lORXrfafb+X5jvi9P0SIqrheBoajq87X5hV3tuyJ8djuvi9sTXC/GKd733/LziKDTK83F9N2jJ/P8XE9Xu+2qOlJ9JqULjWhn1Uzfbh1JV/OaiRDKpfb0AZoY5356MFcO03hdDEb7X0TrftrtVKGlPzpxOn2a7/nO5lb6MP+4tePrhq805Vwcfl+EuVrVM2il07MP9oYIQ3X62+nD3vC9tidd2+nB/ey8o96oLVVUJIu2c/E86vlPjYPmZ8Z7ef8RPA8AAAAAAIDDJkADj1EEMv7x1vV8mNhPX1topT8/9UTVZifEAegn+UD57eXb6d311XQ3H4JPc3QcAYfL2+30D9evpD88eiL9/tHj6a+eeCof+g+qa0clge388wiSvLe6lt66dztd2+xU4YppVJUP8iuqt2wOhgejhymuFtUuOvngvLu9feCQTnz2qCLzSa+TfpY/78t53C+tr6fL6xu7vi4qRnzU6aRr3V46N9vLB8e9/PXdtLKPKiun6nPphWYz3c9je2ljPf13fp7tPcYpAjvrK3fT3z59MZ1vNtJv53v7YGPyUMpmHqN2vr9eVb3kwfV/3NlI763Pp8VaPf1JnmPx+e/0uunTSZ716KB/M8+VCAK9tnQkfXvxyK7rx1z7uNtJf3n1w/S4xEyIz9nOn/mvzz87DEmkVFUr2aqCadvV8/unuzeqeX0tAmVTXH8cjIj3eHJuPn2ztZRezZ97pzt57bx192b6Xl470wdoUopGaR/leXgsz4/vpBPp7tZ2upKfywcba2m/4p5jXUcY7M2jx9If5HXfe6j6yffvL6d/Xr418fvERxsHNCIE9vcXn981lv+xupLezvP2X1buffm1UqpCMO/nNXc9r61XFpbSn508m/705Jkq7LQ12pviCyOu8b08vj9cXU7/l+fw8tThmeF6j32jN2V46sv0+4Pqmt3+7rBKBGjiLj9sb1Tt0t7PY3yv2rsHo0DbcM5uTRE4fFDpZ1BVfno27yV/c+Hirr12ZWsrXc3v/Xc/u5rHaSttTHD1+P7x3h1rZuf1xlVs3l1brtrOdbf76dSJ09U+cJA9PnbP3ihw91BmBwAAAAAA4NfO6NgKeBziMDQqzjzXXKiqUMT/6X9ktl4drsYB483eMOgR4Znl7f3VpGjN1KrqM2fmGumFxnyaS7NptjZTLfSofrOeD8Wv5/e5lg/uo61Rd8otoDWqzhFVdD7qtNONzV66uX2Q+hm7RQurqJTzwnyrau3yg9X71QH8fo/DZ0av5+ab6Vwek2fm59OPNjbyOHfTrR33HZUeomrMi81W/nz1KkXw3sZ6urE1fROg4/kAOtoxRQDjcj5Y/yxf4972F4M4s/k1l19/fOJk1c7r03xPP+l2J36f1/P1z+Zn8flWVL3Y+HkYKpKR0SrnfL1RVRy6tL6aPsvPaXmCg/CYo808YjEOZ/L8jNZSm6NUzc6D/ajq84O1++lxOZc/57ONhXQhz+14oMOmZMPXRl47ERRb3tquWupEW5uY59PEL+I6i7VaenVhsVo7C7O16po7RajrJ912+jjP++kbew2dyuv9VJ5fEdCJQEasxQhd7Lfhz+KoxdarrcWqklXM44erkdzI8+pyvu+YY5OINXgxr8Hn5xfS8fpsFbrYecXYp65udtPV3uRzdXyvS/keo5XT2dnY+2ar9nUhqvO0+8N2ZzFXV/Kvp92b4r7P5Tn/zTwW47ZR7XQ4Tuf7fSmPRzPPi1in0XorQisLVbWpenptcSmP72a1H8beGncezyVer+ffiypU8d8nmTcxF2NveGmhlfes+XQ2r8FeFXh58DWxBu9HGHJtLX/G/kQVjI6M2pK9lveNK90IFPby3rG74lXsHdEGLapwPZf3yv/Ne+X1/Kz3u8dfyNe5kD/DiTznozLW2mB76vAZAAAAAADA4yJAA78i0SYmwjTHIkAzqriyng+NI2ZxWIvy+EwttfL16/nHCKCsVG18+hO38tlLbBpxyBr3HsGfuN/pmxx9+fWjfVDcZVRvOIzxiKBKPd9zXDsOcKu2J3u8dyMND6/HFUP2E2yYHb3iQL83GqNfVsdmYfQ+8ZpmLJv5+rOja3cfqnBRG93DwqjKx9ao5cwkYhzm03C8ajNfbOIyGH2mjcd4EB6fJZ7d3B73FAGrw1g34+dfz2M2u8fvRyWO3hTjuJe4bjybxijoEvPwIPGz2vh6ce1833u13KmqsozeaxLjAEdjNL9mHhrvwxiHxdibarNV6CdWeOx96/2tA11zfN+xLiJgMl2855erj16zo31vvH/Ee47Hf/wsB3vcT2eK8R9rjPar+i9Yg7FfdEdrcZK5P94T5kfjs9ceuNfXTbsv7TS+/3i1qyCkv3QCAAAAAAC/vgRoAAAAAAAAAAAoWi0BAAAAAAAAAEDBBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDRBGgAAAAAAAAAACiaAA0AAAAAAAAAAEUToAEAAAAAAAAAoGgCNAAAAAAAAAAAFE2ABgAAAAAAAACAognQAAAAAAAAAABQNAEaAAAAAAAAAACKJkADAAAAAAAAAEDR6vn1TgIAAAAA4FH6TgIAgK+OdxJ8xfw/cCgUT0Qgb1wAAAAASUVORK5CYII="/>
              </defs>
              </svg>
          </div>
        </div>`
  }

];


export const caseStudyTemplate1 = [
  {
    id : 'header_563298_element',
    template : `<!-- header -->
              <div class="header-container-template-1" #header_563298_element>
                <div class="row">
                <div class="col-md-8">
                  <div class="flex justify-start mb-4">
                    <svg width="281" height="51" viewBox="0 0 281 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M29.6142 9.59531C35.7856 9.59531 37.6717 13.8814 37.6717 18.6893V32.8906H30.3295V20.4774C30.3295 17.2081 29.5131 15.4125 26.8606 15.4125C24.007 15.4125 22.7308 17.75 22.7308 21.3381V32.8906H15.3428V20.4774C15.3428 17.2081 14.5264 15.4125 11.8431 15.4125C9.0395 15.4125 7.71326 17.75 7.71326 21.3381V32.8906H0.347656V10.2073H7.68985V13.7327C8.90326 11.2316 11.411 9.59531 14.8298 9.59531C18.8074 9.59531 20.9969 11.4345 21.9687 14.1418C23.1395 11.5864 25.8931 9.59531 29.6142 9.59531Z" fill="white"/>
                      <path d="M58.4214 19.2515C58.2692 17.0033 56.8429 14.9654 54.0393 14.9654C51.0792 14.9654 49.703 16.8556 49.2943 19.2515H58.4214ZM65.3591 25.4353C64.1926 30.5937 60.1553 33.5039 54.2416 33.5039C47.0505 33.5039 41.9531 29.1126 41.9531 21.9088C41.9531 14.7051 47.1559 9.5966 54.0893 9.5966C61.5827 9.5966 65.5103 14.755 65.5103 20.9388V23.187H49.1782C49.3837 26.1982 51.6242 27.9364 54.4821 27.9364C57.0292 27.9364 58.612 26.9663 59.4283 24.8743L65.3591 25.4353Z" fill="white"/>
                      <path d="M86.8223 21.2926C86.8223 17.6695 84.734 15.3702 81.7239 15.3702C78.2241 15.3702 76.5754 17.8713 76.5754 21.5497C76.5754 25.2281 78.2092 27.7834 81.7239 27.7834C84.734 27.7834 86.8223 25.4852 86.8223 21.8068V21.2926ZM86.8223 28.8555C85.7526 31.5128 83.1012 33.5039 79.2279 33.5039C72.5467 33.5039 69.1172 28.2435 69.1172 21.5497C69.1172 14.856 72.5318 9.5966 79.2279 9.5966C83.1161 9.5966 85.7526 11.5867 86.8223 14.295V0.708786H94.2113V32.8919H86.8223V28.8555Z" fill="white"/>
                      <path d="M107.314 32.8906H99.9758V10.2062H107.314V32.8906ZM99.9258 0.707493H107.423V7.45969H99.9258V0.707493Z" fill="white"/>
                      <path d="M126.438 22.8152L122.717 23.594C120.422 24.054 118.996 24.615 118.996 26.4032C118.996 27.7324 120.015 28.5463 121.598 28.5463C124.3 28.5463 126.438 26.5052 126.438 23.2869V22.8152ZM133.679 26.7114C133.679 27.8801 134.188 28.3944 135.106 28.3944C135.757 28.4135 136.403 28.2807 136.993 28.0055V31.9399C135.607 32.9599 133.919 33.4816 132.201 33.421C129.499 33.421 127.508 31.9909 126.846 29.4388C125.563 32.0069 122.767 33.4009 119.248 33.4009C114.711 33.4009 111.859 31.1027 111.859 27.2214C111.859 22.8779 115.123 21.0387 120.119 20.0686L126.443 18.9424V18.5524C126.443 16.4062 125.373 15.128 123.129 15.128C120.987 15.128 119.918 16.4561 119.508 18.3463L112.677 17.8363C113.454 12.9807 117.062 9.61042 123.538 9.61042C129.452 9.61042 133.684 12.2677 133.684 18.4472L133.679 26.7114Z" fill="white"/>
                      <path d="M145.397 25.3301C145.7 27.5231 147.435 28.7514 150.187 28.7514C152.175 28.7514 153.504 28.0342 153.504 26.8027C153.504 25.6765 152.79 25.0656 150.954 24.7574L147.497 24.2124C142.297 23.3932 139.494 21.605 139.494 17.1096C139.494 12.7182 143.317 9.60087 149.383 9.60087C155.811 9.60087 159.633 12.4611 160.092 17.3157L154.022 17.5186C153.668 15.5275 152.077 14.4012 149.282 14.4012C147.447 14.4012 146.326 15.1801 146.326 16.3956C146.326 17.3157 147.037 17.8767 148.162 18.0286L152.544 18.8074C157.49 19.5873 160.348 21.7729 160.348 26.1132C160.348 30.8668 156.319 33.5156 150.149 33.5156C143.977 33.5156 139.388 31.0145 138.98 25.498L145.397 25.3301Z" fill="white"/>
                      <path d="M172.175 32.8906H164.84V0.7075H172.182V13.7327C173.407 11.2316 176.16 9.59531 179.571 9.59531C185.688 9.59531 187.736 13.8336 187.736 18.6892V32.8906H180.395V20.4774C180.395 17.2081 179.325 15.4125 176.623 15.4125C173.667 15.4125 172.186 17.75 172.186 21.3381L172.175 32.8906Z" fill="white"/>
                      <path d="M206.595 22.8153L202.868 23.5941C200.574 24.0542 199.148 24.6152 199.148 26.4034C199.148 27.7326 200.167 28.5465 201.75 28.5465C204.471 28.5465 206.595 26.5054 206.595 23.2871V22.8153ZM213.836 26.7115C213.836 27.8803 214.344 28.3945 215.262 28.3945C215.912 28.4126 216.558 28.2798 217.148 28.0046V31.9401C215.761 32.959 214.072 33.4807 212.353 33.4212C209.651 33.4212 207.663 31.9911 207.002 29.439C205.727 32.0421 202.924 33.4212 199.404 33.4212C194.866 33.4212 192.016 31.122 192.016 27.2417C192.016 22.8971 195.278 21.058 200.275 20.0879L206.598 18.9616V18.5728C206.598 16.4255 205.525 15.1473 203.281 15.1473C201.139 15.1473 200.07 16.4765 199.66 18.3656L192.836 17.8205C193.614 12.966 197.223 9.5957 203.697 9.5957C209.612 9.5957 213.847 12.253 213.847 18.4325L213.836 26.7115Z" fill="white"/>
                      <path d="M237.079 17.4111C235.895 16.7459 234.547 16.4272 233.189 16.492C230.129 16.492 228.092 18.2292 228.092 22.1647V32.8906H220.766V10.2073H228.108V14.3447C228.974 11.7926 231.32 9.59531 234.38 9.59531C235.757 9.59531 236.927 10.0044 237.537 10.5144L237.079 17.4111Z" fill="white"/>
                      <path d="M248.608 32.8906H241.266V0.7075H248.608V18.5872L257.162 10.2062H265.885L256.358 19.1993L266.247 32.8906H257.936L250.847 23.2867L248.608 25.4839V32.8906Z" fill="white"/>
                      <path d="M280.461 10.2079H272.734V17.9492H280.461V10.2079Z" fill="#EF353F"/>
                      <path d="M272.734 22.1846H280.461C280.461 30.6198 280.461 36.2383 272.734 36.2383C274.796 34.1728 272.734 29.2832 272.734 29.2832C274.87 29.0377 275.554 29.926 275.554 29.926C275.554 27.6745 272.734 27.6586 272.734 27.6586V22.1846Z" fill="#EF353F"/>
                      <path d="M1.61017 50.4064C1.14503 50.1981 0.782072 49.9091 0.518102 49.5394C0.254133 49.1696 0.11789 48.7425 0.109375 48.258H1.34833C1.38984 48.6745 1.56334 49.0251 1.86563 49.3099C2.16685 49.5946 2.60751 49.737 3.1876 49.737C3.74002 49.737 4.17749 49.5989 4.49681 49.3216C4.81612 49.0464 4.97578 48.6915 4.97578 48.258C4.97578 47.918 4.88212 47.6418 4.69478 47.4293C4.50745 47.2168 4.27328 47.0553 3.99228 46.9448C3.71128 46.8343 3.33236 46.7153 2.85551 46.5878C2.26797 46.4348 1.7975 46.2818 1.44413 46.1288C1.09075 45.9758 0.788458 45.7356 0.537261 45.4084C0.286064 45.0811 0.160466 44.6413 0.160466 44.0888C0.160466 43.6043 0.282871 43.175 0.530875 42.801C0.777814 42.427 1.12481 42.138 1.57185 41.934C2.0189 41.73 2.53194 41.628 3.11097 41.628C3.94545 41.628 4.62879 41.8373 5.16099 42.2528C5.69212 42.6693 5.99334 43.2218 6.06147 43.9103H4.78419C4.74055 43.5703 4.56174 43.2706 4.24774 43.0114C3.93268 42.7521 3.51544 42.6225 2.99601 42.6225C2.51065 42.6225 2.11469 42.7479 1.80815 42.9986C1.5016 43.2494 1.34833 43.6 1.34833 44.0505C1.34833 44.3735 1.43987 44.637 1.62294 44.841C1.80602 45.045 2.03167 45.2001 2.2999 45.3064C2.56813 45.4126 2.94492 45.5338 3.43028 45.6698C4.01783 45.8313 4.49042 45.9906 4.84806 46.1479C5.20569 46.3051 5.51224 46.5474 5.76769 46.8746C6.02315 47.2019 6.15088 47.646 6.15088 48.207C6.15088 48.6405 6.03592 49.0485 5.80601 49.431C5.5761 49.8135 5.2355 50.1238 4.78419 50.3618C4.33289 50.5998 3.80069 50.7188 3.1876 50.7188C2.60006 50.7188 2.07425 50.6146 1.61017 50.4064Z" fill="#EF353F"/>
                      <path d="M19.3258 49.278C19.824 48.9901 20.2157 48.5778 20.5009 48.0423C20.7862 47.5058 20.9288 46.8863 20.9288 46.1798C20.9288 45.4658 20.7862 44.8431 20.5009 44.3119C20.2157 43.7806 19.8261 43.3705 19.3322 43.0826C18.8384 42.7925 18.2764 42.6491 17.6462 42.6491C17.0161 42.6491 16.4541 42.7925 15.9602 43.0826C15.4664 43.3705 15.0768 43.7806 14.7915 44.3119C14.5063 44.8431 14.3636 45.4658 14.3636 46.1798C14.3636 46.8863 14.5063 47.5058 14.7915 48.0423C15.0768 48.5778 15.4685 48.9901 15.9666 49.278C16.4648 49.567 17.0246 49.7115 17.6462 49.7115C18.2678 49.7115 18.8277 49.567 19.3258 49.278ZM15.3855 50.1397C14.7043 49.7519 14.1657 49.2121 13.7697 48.5194C13.3738 47.8277 13.1758 47.0468 13.1758 46.1798C13.1758 45.3138 13.3738 44.5329 13.7697 43.8412C14.1657 43.1474 14.7043 42.6087 15.3855 42.2209C16.0667 41.8341 16.8203 41.6418 17.6462 41.6418C18.4807 41.6418 19.2386 41.8341 19.9198 42.2209C20.601 42.6087 21.1374 43.1463 21.5291 43.8338C21.9208 44.5223 22.1167 45.3053 22.1167 46.1798C22.1167 47.0553 21.9208 47.8383 21.5291 48.5258C21.1374 49.2143 20.601 49.7519 19.9198 50.1397C19.2386 50.5264 18.4807 50.7188 17.6462 50.7188C16.8203 50.7188 16.0667 50.5264 15.3855 50.1397Z" fill="#EF353F"/>
                      <path d="M34.4309 41.7422V42.6867H30.5608V45.6819H33.7028V46.6265H30.5608V50.6289H29.3984V41.7422H34.4309Z" fill="#EF353F"/>
                      <path d="M47.06 41.7422V42.6867H44.6332V50.6289H43.4708V42.6867H41.0312V41.7422H47.06Z" fill="#EF353F"/>
                      <path d="M65.4294 41.7411L62.8493 50.6279H61.5465L59.4773 43.4751L57.3315 50.6279L56.0415 50.6406L53.5508 41.7411H54.7897L56.7312 49.2764L58.877 41.7411H60.1798L62.2235 49.2509L64.1777 41.7411H65.4294Z" fill="#EF353F"/>
                      <path d="M77.3829 47.7092L75.7735 43.2212L74.1642 47.7092H77.3829ZM77.715 48.6527H73.8321L73.1168 50.6289H71.8906L75.1094 41.7932H76.4505L79.6564 50.6289H78.4303L77.715 48.6527Z" fill="#EF353F"/>
                      <path d="M87.9709 46.0644H89.6825C90.3126 46.0644 90.7852 45.9093 91.1002 45.599C91.4153 45.2888 91.5728 44.8744 91.5728 44.3559C91.5728 43.8289 91.4174 43.4209 91.1066 43.1319C90.7958 42.8429 90.3211 42.6984 89.6825 42.6984H87.9709V46.0644ZM91.4962 50.6289L89.3759 46.9952H87.9709V50.6289H86.8086V41.7422H89.6825C90.3552 41.7422 90.9235 41.8569 91.3876 42.0864C91.8517 42.3159 92.1987 42.6262 92.4286 43.0172C92.6585 43.4082 92.7735 43.8544 92.7735 44.3559C92.7735 44.9679 92.5968 45.5077 92.2434 45.9752C91.89 46.4427 91.3599 46.7518 90.6532 46.9059L92.8884 50.6289H91.4962Z" fill="#EF353F"/>
                      <path d="M101.487 42.6857V45.6564H104.731V46.6116H101.487V49.6716H105.114V50.6289H100.324V41.7294H105.114V42.6857H101.487Z" fill="#EF353F"/>
                      <path d="M127.184 48.761C127.789 48.1533 128.091 47.3012 128.091 46.2047C128.091 45.0997 127.787 44.2369 127.178 43.6164C126.569 42.9959 125.694 42.6857 124.553 42.6857H122.944V49.6716H124.553C125.702 49.6716 126.58 49.3688 127.184 48.761ZM127.076 42.284C127.787 42.6453 128.332 43.1606 128.71 43.8321C129.089 44.5047 129.279 45.2952 129.279 46.2047C129.279 47.1142 129.089 47.9015 128.71 48.5687C128.332 49.237 127.787 49.747 127.076 50.0998C126.365 50.4525 125.524 50.6289 124.553 50.6289H121.781V41.7422H124.553C125.524 41.7422 126.365 41.9217 127.076 42.284Z" fill="#EF353F"/>
                      <path d="M137.721 42.6857V45.6564H140.965V46.6116H137.721V49.6716H141.348V50.6289H136.559V41.7294H141.348V42.6857H137.721Z" fill="#EF353F"/>
                      <path d="M156.216 41.7422L152.857 50.6289H151.515L148.156 41.7422H149.395L152.192 49.4049L154.99 41.7422H156.216Z" fill="#EF353F"/>
                      <path d="M164.405 42.6857V45.6564H167.649V46.6116H164.405V49.6716H168.032V50.6289H163.242V41.7294H168.032V42.6857H164.405Z" fill="#EF353F"/>
                      <path d="M176.705 49.6854H179.822V50.6289H175.543V41.7411H176.705V49.6854Z" fill="#EF353F"/>
                      <path d="M192.521 49.278C193.019 48.9901 193.411 48.5778 193.696 48.0423C193.982 47.5058 194.124 46.8863 194.124 46.1798C194.124 45.4658 193.982 44.8431 193.696 44.3119C193.411 43.7806 193.021 43.3705 192.528 43.0826C192.034 42.7925 191.472 42.6491 190.842 42.6491C190.211 42.6491 189.649 42.7925 189.156 43.0826C188.662 43.3705 188.272 43.7806 187.987 44.3119C187.702 44.8431 187.559 45.4658 187.559 46.1798C187.559 46.8863 187.702 47.5058 187.987 48.0423C188.272 48.5778 188.664 48.9901 189.162 49.278C189.66 49.567 190.22 49.7115 190.842 49.7115C191.463 49.7115 192.023 49.567 192.521 49.278ZM188.581 50.1397C187.9 49.7519 187.361 49.2121 186.965 48.5194C186.569 47.8277 186.371 47.0468 186.371 46.1798C186.371 45.3138 186.569 44.5329 186.965 43.8412C187.361 43.1474 187.9 42.6087 188.581 42.2209C189.262 41.8341 190.016 41.6418 190.842 41.6418C191.676 41.6418 192.434 41.8341 193.115 42.2209C193.796 42.6087 194.333 43.1463 194.724 43.8338C195.116 44.5223 195.312 45.3053 195.312 46.1798C195.312 47.0553 195.116 47.8383 194.724 48.5258C194.333 49.2143 193.796 49.7519 193.115 50.1397C192.434 50.5264 191.676 50.7188 190.842 50.7188C190.016 50.7188 189.262 50.5264 188.581 50.1397Z" fill="#EF353F"/>
                      <path d="M206.898 45.5417C207.205 45.2612 207.358 44.8617 207.358 44.3432C207.358 43.2467 206.728 42.6984 205.468 42.6984H203.756V45.9624H205.468C206.115 45.9624 206.592 45.8222 206.898 45.5417ZM207.786 46.1855C207.279 46.6743 206.506 46.9187 205.468 46.9187H203.756V50.6289H202.594V41.7422H205.468C206.472 41.7422 207.237 41.9844 207.76 42.4689C208.284 42.9534 208.546 43.5782 208.546 44.3432C208.546 45.0827 208.293 45.6968 207.786 46.1855Z" fill="#EF353F"/>
                      <path d="M224.769 41.8059V50.6289H223.606V44.0488L220.669 50.6289H219.851L216.901 44.0372V50.6289H215.738V41.8059H216.99L220.26 49.0978L223.53 41.8059H224.769Z" fill="#EF353F"/>
                      <path d="M233.643 42.6857V45.6564H236.887V46.6116H233.643V49.6716H237.27V50.6289H232.48V41.7294H237.27V42.6857H233.643Z" fill="#EF353F"/>
                      <path d="M251.781 50.6289H250.618L245.944 43.5527V50.6289H244.781V41.7294H245.944L250.618 48.7929V41.7294H251.781V50.6289Z" fill="#EF353F"/>
                      <path d="M264.986 41.7422V42.6867H262.559V50.6289H261.397V42.6867H258.957V41.7422H264.986Z" fill="#EF353F"/>
                      </svg>
                      
                  </div>

                  <div class="header-title">
                    <input type="text"  placeholder="Title"  *ngIf="!toggleInputList['header_563298'] && (isCreate || isEdit)" [value]="caseStudy['header_563298'] || ''"  (input)="onInputChange($event , 'header_563298')" class="w-full focus:outline-none">
                    <span *ngIf="toggleInputList['header_563298'] && (isCreate || isEdit)" class="fw-bold header-Text text-white">{{ caseStudy['header_563298'] || 'Title'}}</span>
                    <div class="button header-edit-btn">
                      <button  *ngIf="isCreate || isEdit"
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('header_563298')"
                      >
                        <mat-icon> {{!toggleInputList['header_563298'] ?  'edit' : 'check'}}</mat-icon>
                      </button>
                    </div>
                    <span  *ngIf="!(isCreate || isEdit)" class="fw-bold header-Text text-white">{{ caseStudy['header_563298'] || 'Title'}}</span>
                    <p class="case-study-lable w-full mt-2">Case Study</p>
                  </div>
                </div>
                <!-- Image Upload Box -->
                <div class="col-md-4" #twoimages_694235_element>
                    <div class="image-upload">
                      <div class="w-full h-full flex items-center justify-center rounded-lg " [ngClass]="{ 'border-2 border-dashed border-gray-400 bg-white': isEdit || isCreate }">
                        <label class="cursor-pointer flex flex-col items-center justify-center upload">
                            <img  *ngIf="!(isEdit || isCreate)" [src]="getImage('twoimages_694235') || '../../../../../../assets/img/illustrations/Image_Attachment.svg'" alt="Upload Image"  class="cover-image">
                            <img
                            *ngIf="(isEdit || isCreate) && getImage('twoimages_694235')"
                            class="cover-image"
                            [src]="getImage('twoimages_694235')"
                            alt="desktop-mobile" />
                            <div class="edit-image-wrapper" *ngIf="(isEdit || isCreate) && !getImage('twoimages_694235')">
                              <div class="edit-image-container">
                                <img
                                  (click)="addImage('twoimages_694235')"
                                  [src]="'../../../../../../assets/img/illustrations/Image_Attachment.svg'"
                                  alt="desktop-mobile"
                                  class="edit-image"/>
                                <label class="text-[#8e8e8e] font-bold text-[15px] mt-[10px]">Click to Upload Image</label>
                              </div>
                            </div>

                            <div class="edit-img-circle" (click)="addImage('twoimages_694235')"  *ngIf="(isEdit || isCreate) && getImage('twoimages_694235')">
                              <img src="../../../../../../assets/img/illustrations/Image_Attachment.svg" alt="edit icon"/>
                            </div>
                        </label>
                    </div>
                    </div>
                </div>
                </div>
              </div>
`
  },
  {
    id : 'RichTextBox_986325_element',
    template : `<div class="row" #RichTextBox_986325_element>
                <div class="col-8">
                  <div class="cmn-single-block-wrapper mt-5">
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description" (input)="onInputChange($event , 'RichTextBox_986325')"  [value]="caseStudy['RichTextBox_986325']?.trim() || ''"  class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <div *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <div [innerHTML]=" getTextArea(caseStudy['RichTextBox_986325'])"></div> 
                         </div>
                      </div>
                  </div>
                </div>
                <div class="col-4 mt-5"></div>
                <hr class="hr-template-1"/>
              </div>
`
  },
  {
    id : 'redHeader_563254_element',
    template : `<div class="row" cdkDrag #redHeader_563254_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_563254']">{{ caseStudy['redHeader_563254'] ?? 'Project Duration' || caseStudy['redHeader_563254'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_563254']">
                          <input
                             (input)="onInputChange($event , 'redHeader_563254')"
                            placeholder="Enter your title"
                           [value]="caseStudy['redHeader_563254'] ?? 'Project Duration' || caseStudy['redHeader_563254']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ caseStudy['redHeader_563254'] ?? 'Project Duration' || caseStudy['redHeader_563254'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_563254')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_563254'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_563254_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_993325_element',
    template : `<div class="row" cdkDrag #RichTextBox_993325_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description"  (input)="onInputChange($event , 'RichTextBox_993325')"  [value]="caseStudy['RichTextBox_993325']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(caseStudy['RichTextBox_993325'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon"  (click)="removePortion('RichTextBox_993325_element')" >
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
               <hr class="hr-template-1"/>
              </div>`
  },
  {
    id : 'redHeader_596354_element',
    template : `<div class="row" cdkDrag #redHeader_596354_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_596354']">{{ caseStudy['redHeader_596354'] ?? 'Scoping' || caseStudy['redHeader_596354'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_596354']">
                          <input
                             (input)="onInputChange($event , 'redHeader_596354')"
                            placeholder="Enter your title"
                            [value]="caseStudy['redHeader_596354'] ?? 'Scoping' || caseStudy['redHeader_596354']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1">{{ caseStudy['redHeader_596354'] ?? 'Scoping' || caseStudy['redHeader_596354']}}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_596354')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_596354'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_596354_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_900325_element',
    template : `<div class="row" #RichTextBox_900325_element cdkDrag>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description" (input)="onInputChange($event , 'RichTextBox_900325')"  [value]="caseStudy['RichTextBox_900325']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(caseStudy['RichTextBox_900325'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('RichTextBox_900325_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="hr-template-1"/>
              </div>`
  },
  {
    id : 'redHeader_965034_element',
    template : `<div class="row" cdkDrag #redHeader_965034_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_965034']">{{ caseStudy['redHeader_965034'] ?? 'Design System & Prototyping' || caseStudy['redHeader_965034'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_965034']">
                          <input
                             (input)="onInputChange($event , 'redHeader_965034')"
                            placeholder="Enter your title"
                            [value]="caseStudy['redHeader_965034'] ?? 'Design System & Prototyping' || caseStudy['redHeader_965034']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1" >{{ caseStudy['redHeader_965034'] ?? 'Design System & Prototyping' || caseStudy['redHeader_965034'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_965034')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_965034'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_965034_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'image_textarea_563001_element',
    template : ` <div class="row" cdkDrag #image_textarea_563001_element>
                <div class="col-5 cmn-single-block-wrapper">
                  <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                    <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                  </div>
                  <div class="single-image-template-1">
                    <div class="w-full h-full flex items-center justify-center rounded-lg bg-white" [ngClass]="{ 'border-2 border-dashed border-gray-400 ': isEdit || isCreate }">
                      <label class="cursor-pointer flex flex-col items-center justify-center upload">
                        <img  *ngIf="!(isEdit || isCreate)" [src]="getImage('twoimages_563001') || '../../../../../../assets/img/illustrations/Image_Attachment.svg'" alt="Upload Image"  class="cover-image">
                        <img
                        *ngIf="(isEdit || isCreate) && getImage('twoimages_563001')"
                        class="cover-image"
                        [src]="getImage('twoimages_563001')"
                        alt="desktop-mobile" />
                        <div class="edit-image-wrapper" *ngIf="(isEdit || isCreate) && !getImage('twoimages_563001')">
                          <div class="edit-image-container">
                            <img
                              (click)="addImage('twoimages_563001')"
                              [src]="'../../../../../../assets/img/illustrations/Image_Attachment.svg'"
                              alt="desktop-mobile"
                              class="edit-image"/>
                            <label class="text-[#8e8e8e] font-bold text-[15px] mt-[10px]">Click to Upload Image</label>
                          </div>
                        </div>
            
                        <div class="edit-img-circle" (click)="addImage('twoimages_563001')"  *ngIf="(isEdit || isCreate) && getImage('twoimages_563001')">
                          <img src="../../../../../../assets/img/illustrations/Image_Attachment.svg" alt="edit icon"/>
                        </div>
                      </label>
                  </div>
                  </div>
                  
                </div>
                  <div class="col-7">
                    <div class="cmn-single-block-wrapper">
                       <div class="input-outline flex-grow">
                          <div
                           [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                            class="w-full cmn-text-block-inner"
                              *ngIf="isEdit || isCreate"
                          >
                            <textarea placeholder="Enter your description" (input)="onInputChange($event , 'RichTextBox_563001')"  [value]="caseStudy['RichTextBox_563001']?.trim() || ''"  class="w-full"  rows="16" cols="2">
                            </textarea>
                          </div>
                            <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                              <span [innerHTML]=" getTextArea(caseStudy['RichTextBox_563001'])"></span> 
                           </p>
                        </div>
                      <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                        <div class="button">
                          <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('image_textarea_563001_element')">
                            <mat-icon>delete</mat-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
`
  },
  {
    id : 'image_textarea_596301_element',
    template : `<div class="row mt-5" #image_textarea_596301_element cdkDrag>
                  <div class="col-7">
                    <div class="cmn-single-block-wrapper">
                      <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                        <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                      </div>
                       <div class="input-outline flex-grow">
                          <div
                           [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                            class="w-full cmn-text-block-inner"
                              *ngIf="isEdit || isCreate"
                          >
                            <textarea placeholder="Enter your description" (input)="onInputChange($event , 'RichTextBox_596301')"  [value]="caseStudy['RichTextBox_596301']?.trim() || ''" class="w-full"  rows="16" cols="2">
                            </textarea>
                          </div>
                            <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                              <span [innerHTML]=" getTextArea(caseStudy['RichTextBox_596301'])"></span> 
                           </p>
                        </div>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="cmn-single-block-wrapper">
                      <div class="single-image-template-1">
                        <div class="w-full h-full flex items-center justify-center rounded-lg bg-white" [ngClass]="{ 'border-2 border-dashed border-gray-400 ': isEdit || isCreate }">
                          <label class="cursor-pointer flex flex-col items-center justify-center upload">
                            <img  *ngIf="!(isEdit || isCreate)" [src]="getImage('twoimages_596301') || '../../../../../../assets/img/illustrations/Image_Attachment.svg'" alt="Upload Image"  class="cover-image">
                            <img
                            *ngIf="(isEdit || isCreate) && getImage('twoimages_596301')"
                            class="cover-image"
                            [src]="getImage('twoimages_596301')"
                            alt="desktop-mobile" />
                            <div class="edit-image-wrapper" *ngIf="(isEdit || isCreate) && !getImage('twoimages_596301')">
                              <div class="edit-image-container">
                                <img
                                  (click)="addImage('twoimages_596301')"
                                  [src]="'../../../../../../assets/img/illustrations/Image_Attachment.svg'"
                                  alt="desktop-mobile"
                                  class="edit-image"/>
                                <label class="text-[#8e8e8e] font-bold text-[15px] mt-[10px]">Click to Upload Image</label>
                              </div>
                            </div>
                
                            <div class="edit-img-circle" (click)="addImage('twoimages_596301')"  *ngIf="(isEdit || isCreate) && getImage('twoimages_596301')">
                              <img src="../../../../../../assets/img/illustrations/Image_Attachment.svg" alt="edit icon"/>
                            </div>
                          </label>
                        </div>
                      </div>
                     
                      <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                        <div class="button">
                          <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('image_textarea_596301_element')">
                            <mat-icon>delete</mat-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                 
              </div>`
  },
  {
    id : 'redHeader_365902_element',
    template : ` <div class="row" cdkDrag #redHeader_365902_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2  class="red-Title-template-1"  *ngIf="toggleInputList['redHeader_365902']">{{ caseStudy['redHeader_365902'] ?? 'Technology' || caseStudy['redHeader_365902'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_365902']">
                          <input
                             (input)="onInputChange($event , 'redHeader_365902')"
                            placeholder="Enter your title"
                            [value]="caseStudy['redHeader_365902'] ?? 'Technology' || caseStudy['redHeader_365902']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1"  >{{caseStudy['redHeader_365902'] ?? 'Technology' || caseStudy['redHeader_365902'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_365902')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_365902'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_365902_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'images_block_596301_element',
    template : ` <div class="mt-5" #images_block_596301_element cdkDrag>
          <div class="flex flex-wrap">
            <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
              <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
            </div>
            <div class="imagesbox-container">
              <div class="row">
                <div *ngFor="let imageId of caseStudy['image_box_236545']; let i = index" class="col-3">
                  <div class="cmn-single-block-wrapper mt-2">
                    <div class="image-box-template-1">
                      <div
                        class="w-full h-full flex items-center justify-center rounded-lg bg-white"
                        [ngClass]="{ 'border-2 border-dashed border-gray-400 ': isEdit || isCreate }"
                      >
                        <label class="cursor-pointer flex flex-col items-center justify-center upload">
                          <img
                            *ngIf="!(isEdit || isCreate)"
                            [src]="caseStudy[imageId] || '../../../../../../assets/img/illustrations/Image_Attachment.svg'"
                            alt="Upload Image"
                            class="cover-image"
                          />
                          <img
                            *ngIf="(isEdit || isCreate) && caseStudy[imageId]"
                            class="cover-image"
                            [src]="caseStudy[imageId]"
                            alt="uploaded-image"
                          />
                          <div
                            class="edit-image-wrapper"
                            *ngIf="(isEdit || isCreate) && !caseStudy[imageId]"
                          >
                            <div class="edit-image-container">
                              <img
                                (click)="addImage(imageId)"
                                src="../../../../../../assets/img/illustrations/Image_Attachment.svg"
                                alt="Upload Image"
                                class="edit-image"
                              />
                              <label
                                class="text-[#8e8e8e] font-bold text-[15px] mt-[10px]"
                              >
                                Click to Upload Image
                              </label>
                            </div>
                          </div>
            
                          <div
                            class="edit-img-circle"
                            (click)="addImage(imageId)"
                            *ngIf="(isEdit || isCreate) && caseStudy[imageId]"
                          >
                            <img
                              src="../../../../../../assets/img/illustrations/Image_Attachment.svg"
                              alt="edit icon"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-3 mt-2" (click)="addImageToBox('image_box_236545')"  *ngIf="(isEdit || isCreate)">
                  <div class="image-block-case-study-template-1">
                    <span class="add-icon">+</span>
                    <p>Add Image Block</p>
                  </div>
                </div>
              </div>
             
            </div>
            
            <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
              <div class="button">
                <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('images_block_596301_element')">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </div>`
  },
  {
    id : 'redHeader_512314_element',
    template : ` <div class="row" cdkDrag #redHeader_512314_element>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2  class="red-Title-template-1"  *ngIf="toggleInputList['redHeader_512314']">{{ caseStudy['redHeader_512314'] ?? 'Development' || caseStudy['redHeader_512314'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_512314']">
                          <input
                             (input)="onInputChange($event , 'redHeader_512314')"
                            placeholder="Enter your title"
                            [value]="caseStudy['redHeader_512314'] ?? 'Development' || caseStudy['redHeader_512314']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1"  >{{ caseStudy['redHeader_512314'] ?? 'Development' || caseStudy['redHeader_512314'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_512314')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_512314'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_512314_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id:'RichTextBox_966475_element',
    template : `<div class="row" #RichTextBox_966475_element cdkDrag>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description" (input)="onInputChange($event , 'RichTextBox_966475')"  [value]="caseStudy['RichTextBox_966475']?.trim() || ''"  class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(caseStudy['RichTextBox_966475'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('RichTextBox_966475_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'redHeader_646452_element',
    template : `<div class="row" #redHeader_646452_element cdkDrag>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                    <div
                      class="cmn-middle-block"
                      [ngClass]="{ 'cmn-header-block-wrapper': true }"
                    >
                      <div class="block-no-border-input  w-full" *ngIf="isCreate || isEdit">
                        <h2 class="red-Title-template-1" *ngIf="toggleInputList['redHeader_646452']">{{ caseStudy['redHeader_646452'] ?? 'Result' || caseStudy['redHeader_646452'] }}</h2>
                        <div class="cmn-text-block-inner red-header-template-1"  *ngIf="!toggleInputList['redHeader_646452']">
                          <input
                             (input)="onInputChange($event , 'redHeader_646452')"
                            placeholder="Enter your title"
                            [value]="caseStudy['redHeader_646452'] ?? 'Result' || caseStudy['redHeader_646452']"
                          />
                        </div>
                      </div>
                       <div class="block-no-border-input  w-full" *ngIf="!(isCreate || isEdit)">
                        <h2 class="red-Title-template-1" >{{ caseStudy['redHeader_646452'] ?? 'Result' || caseStudy['redHeader_646452'] }}</h2>
                      </div>
                      <div class="button header-block-edit-btn" *ngIf="isCreate || isEdit">
                        <button
                          mat-flat-button
                          color="primary"
                          class="btn-icon btn-md-icon"
                          (click)="onToggleChange('redHeader_646452')"
                        >
                          <mat-icon> {{ !toggleInputList['redHeader_646452'] ?  'edit' : 'check'}}</mat-icon>
                        </button>
                      </div>
                    </div>
                    <div class="cmn-single-block-delete-icon-box"  *ngIf="isCreate || isEdit">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('redHeader_646452_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'RichTextBox_203103_element',
    template : ` <div class="row"  #RichTextBox_203103_element  cdkDrag>
                <div class="col-12">
                  <div class="cmn-single-block-wrapper mt-5">
                    <div class="cmn-single-block-move-icon-box" *ngIf="isCreate || isEdit">
                      <mat-icon (mousedown)="dragDisabled = false">drag_handle</mat-icon>
                    </div>
                     <div class="input-outline flex-grow">
                        <div
                         [ngClass]="{ 'cmn-header-block-wrapper': true, 'cmn-block-border': isCreate || isEdit }"
                          class="w-full cmn-text-block-inner"
                            *ngIf="isEdit || isCreate"
                        >
                          <textarea placeholder="Enter your description" (input)="onInputChange($event , 'RichTextBox_203103')"  [value]="caseStudy['RichTextBox_203103']?.trim() || ''" class="w-full"  rows="8" cols="2">
                          </textarea>
                        </div>
                          <p *ngIf="!(isCreate || isEdit)" class="text-dark-black leading-[29px]" style="white-space: pre-wrap;">
                            <span [innerHTML]=" getTextArea(caseStudy['RichTextBox_203103'])"></span> 
                         </p>
                      </div>
                    <div class="cmn-single-block-delete-icon-box" *ngIf="isEdit || isCreate">
                      <div class="button">
                        <button mat-flat-button color="warn" class="btn-icon btn-md-icon" (click)="removePortion('RichTextBox_203103_element')">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
  },
  {
    id : 'footer',
    template : `<div class=" footer-bg-template-1" #footer >
                  <svg width="100%" height="140" viewBox="0 0 1140 140" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect x="0.519531" y="0.976562" width="1138.96" height="139" fill="url(#pattern0_1859_2192)"/>
                    <defs>
                    <pattern id="pattern0_1859_2192" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_1859_2192" transform="matrix(0.000443262 0 0 0.00363209 0 -0.00486025)"/>
                    </pattern>
                    <image id="image0_1859_2192" width="2256" height="278" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACNAAAAEWCAYAAACtofgsAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAKN3SURBVHgB7L0JlGVXdZ9/ah66elJrFiAJgZglRgkQgwRisBDzDDbEAf5gx4bYiZdXkuWQrOWYlThZjhPj4NhMJpjZgAwIJAwIxCSQQQgkoQHNYw/qqbrmqv/5TvduXz1V1bvv1dDV/b4Pnqq63nv3nvnes/fv7p2SiIiIiIiIiIiIiIiIiIiIiEgH05Vf5yYRERERERERERERERERERERkQ4FAc1cEhERERERERERERERERERERHpULqTiIiIiIiIiIiIiIiIiIiIiEgHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6GgU0IiIiIiIiIiIiIiIiIiIiItLRKKARERERERERERERERERERERkY5GAY2IiIiIiIiIiIiIiIiIiIiIdDQKaERERERERERERERERERERESko1FAIyIiIiIiIiIiIiIiIiIiIiIdjQIaEREREREREREREREREREREeloFNCIiIiIiIiIiIiIiIiIiIiISEejgEZEREREREREREREREREREREOhoFNCIiIiIiIiIiIiIiIiIiIiLS0SigEREREREREREREREREREREZGORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHY0CGhERERERERERERERERERERHpaBTQiIiIiIiIiIiIiIiIiIiIiEhHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6GgU0IiIiIiIiIiIiIiIiIiIiItLRKKARERERERERERERERERERERkY5GAY2IiIiIiIiIiIiIiIiIiIiIdDQKaERERERERERERERERERERESko1FAIyIiIiIiIiIiIiIiIiIiIiIdjQIaEREREREREREREREREREREeloFNCIiIiIiIiIiIiIiIiIiIiISEejgEZEREREREREREREREREREREOhoFNCIiIiIiIiIiIiIiIiIiIiLS0SigEREREREREREREREREREREZGORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHY0CGhERERERERERERERERERERHpaBTQiIiIiIiIiIiIiIiIiIiIiEhHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6GgU0IiIiIiIiIiIiIiIiIiIiItLRKKARERERERERERERERERERERkY5GAY2IiIiIiIiIiIiIiIiIiIiIdDQKaERERERERERERERERERERESko1FAIyIiIiIiIiIiIiIiIiIiIiIdjQIaEREREREREREREREREREREeloFNCIiIiIiIiIiIiIiIiIiIiISEejgEZEREREREREREREREREREREOhoFNCIiIiIiIiIiIiIiIiIiIiLS0SigEREREREREREREREREREREZGORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHY0CGhERERERERERERERERERERHpaBTQiIiIiIiIiIiIiIiIiIiIiEhHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6GgU0IiIiIiIiIiIiIiIiIiIiItLRKKARERERERERERERERERERERkY5GAY2IiIiIiIiIiIiIiIiIiIiIdDQKaERERERERERERERERERERESko1FAIyIiIiIiIiIiIiIiIiIiIiIdjQIaEREREREREREREREREREREeloFNCIiIiIiIiIiIiIiIiIiIiISEejgEZEREREREREREREREREREREOhoFNCIiIiIiIiIiIiIiIiIiIiLS0SigEREREREREREREREREREREZGORgGNiIiIiIiIiIiIiIiIiIiIiHQ0CmhEREREREREREREREREREREpKNRQCMiIiIiIiIiIiIiIiIiIiIiHY0CGhERERERERERERERERERERHpaBTQiIiIiIiIiIiIiIiIiIiIiEhHo4BGRERERERERERERERERERERDoaBTQiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6Wh6k4iIHJacffbZ6fGPf3zavHlz08/Ozs6mbdu2pe9+97tp69ataffu3fN+rqenJz3sYQ9Lz3/+89OmTZtSHfbu3Ztuv/329P3vfz/t2rUrzczMJFl9hoeHy3h4znOeU/s71157bbr++uvTzTffnKanp5Mc/rAenHjiiemcc84pY6K3t/mt3q233lpeV1xxRRIREREREREREREREelUFNCIiBymPO5xj0svetGL0sMf/vCmn0UcceONN6a77rorjY2NLSigwdl+/PHHFwHNIx/5yFSH7du3F8f7DTfcsOBxZeUZGBhIp512WnrDG95Q+zuXXnppGQ8IoBTQHBkgmjn11FPTi1/84nTsscemwcHBpt/54Q9/WF4KaEREREREREREREREpJNRQCMicphClAlENI997GObfnZycjL19/eX6BQILRaiu7s7bdy4sRzzjDPOSHW49957S1QbHPd8Xw4NfX196YQTTkhPecpTan8HURWRhuy3I4ehoaG0ZcuWEo3opJNOKvOyGTt27CgRaERERERERERERERERDoZPWYiIiIiIiIiIiIiIiIiIiIi0tEooBERERERERERERERERERERGRjkYBjYiIiIiIiIiIiIiIiIiIiIh0NApoRERERERERERERERERERERKSjUUAjIiIiIiIiIiIiIiIiIiIiIh2NAhoRERERERERERERERERERER6WgU0IiIiIiIiIiIiIiIiIiIiIhIR6OARkREREREREREREREREREREQ6mt4kIiJSYc+ePenGG29MXV1dtT6/ffv2dMcdd6SxsbE0NzeXREREREREREREREREREQONxTQiIjIQSYnJ9P111+f/tf/+l9pw4YNtb4zMTGRtm3blu6+++40PT2dREREREREREREREREREQONxTQiIjIQWZnZ9POnTvTVVddlXp6emp9h6gzCG+MQCMiIiIiIiIiIiIiIiIihysKaESOAAYGBlJfX195VdPuTE1NleggMzMz5dUuHLO7uzsNDQ0VUUVvb2/5G2ILIo4gnuDFvw8l1XagnJSZctIOlJM2oJz8fqiFHrQh5RwcHDxYTl7RnpSZn6sN7cK5EdGsBWgb+pK+pc34Nz+BstJe8RofH18TAh76tb+/v7wa02BRPsZhtbxrXXREHRinMWaDGCusMYdqTsXaRPlibYpxApSLdYm5RHvT9oeLyIs6MIZYd6kT5aYuCNViTRMREREREREREREREZHlQwGNyGEODuR169al9evXl5Q71aghu3fvLkKI0dHRJQlocOTiOD/66KOLo3p4eLj8G6f0vn370o4dO9KuXbuKU/dQOqdHRkZKW2zcuLGUMUQ0tANOfsp6//33Fyf0UtpjOaAdKS9tioM8HP70FeXldSgENGsNxjfimWOPPba0UwgKgH7cu3dv6VdeIaQ51AIJyrdp06YyH6uCEwhxFOUm7dVaKO9ihLBr8+bNZW4xZiGEQHv27ClzivocqjlFG8ecZx2knCFKQ2zCi/Lde++9BwV0hwOsX9TppJNOKnVivDN27rzzzrJOKKARERERERERERERERFZXhTQiKwiONRPO+204hBtdKzPRzjZb7nlluKkBpzCiAhO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"/>
                    </defs>
                    </svg>
              </div>`
  }
];