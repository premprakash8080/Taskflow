import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentEditorContainerModule, DocumentEditorModule, ToolbarService } from '@syncfusion/ej2-angular-documenteditor';
import { SpreadsheetModule } from '@syncfusion/ej2-angular-spreadsheet';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MarkdownToHtmlPipe } from 'src/@vex/pipes/markdown.pipe';
import { AddReminderDialogComponent } from './components/add-reminder-dialog/add-reminder-dialog.component';
import { AddToTenderComponent } from './components/add-to-tender/add-to-tender.component';
import { AuthenticatorDialogComponent } from './components/authenticator-dialog/authenticator-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditorSignatureDialogComponent } from './components/editor-signature-dialog/editor-signature-dialog.component';
import { GoogleMapSuggestionComponent } from './components/google-map-suggestion/google-map-suggestion.component';
import { ImageCropperDialogComponent } from './components/image-cropper-dialog/image-cropper-dialog.component';
import { PageHeaderToggleButtonComponent } from './components/page-header-toggle-button/page-header-toggle-button.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { TemplateOrBuildOwnDialogueComponent } from './components/template-or-build-own-dialogue/template-or-build-own-dialogue.component';
import { TermsConditionDialogeComponent } from './components/terms-condition-dialoge/terms-condition-dialoge.component';
import { RenameDialogComponent } from './rename-dialog/rename-dialog.component';
import { WarningScreensDialogComponent } from './components/warning-screens-dialog/warning-screens-dialog.component';
import { AIPolicyDialogComponent } from './components/ai-policy-dialog/ai-policy-dialog.component';
import { AddEditFolderComponent } from './components/add-edit-folder/add-edit-folder.component';
import { AddToFolderComponent } from './components/add-to-folder/add-to-folder.component';
import { AIResponseConfirmationDialogComponent } from './components/ai-response-confirmation-dialog/ai-response-confirmation-dialog.component';
import { AiPolicyConfirmationDialogueComponent } from './components/ai-policy-confirmation-dialogue/ai-policy-confirmation-dialogue.component';
import { TopupAicreditsComponent } from './components/topup-aicredits/topup-aicredits.component';
import { DeleteFolderConfirmationDialogComponent } from './components/delete-folder-confirmation-dialog/delete-folder-confirmation-dialog.component';
import { DeleteRoleDialogComponent } from './components/delete-role-dialog/delete-role-dialog.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { BlockBuilderSignatureDialogueComponent } from './components/block-builder-signature-dialogue/block-builder-signature-dialogue.component';
import { DragDropFilesComponent } from './components/drag-drop-files/drag-drop-files.component';
import { FileViewersComponent } from './components/file-viewers/file-viewers.component';
import { ChooseTemplatesComponent } from './components/choose-templates/choose-templates.component';
import { DownloadPdfModeComponent } from './components/download-pdf-mode/download-pdf-mode.component';
import { ConfirmationDialogNewComponent } from './components/confirmation-dialog-new/confirmation-dialog-new.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    PageHeaderToggleButtonComponent,
    DeleteConfirmationDialogComponent,
    AddToTenderComponent,
    DialogComponent,
    TermsConditionDialogeComponent,
    RenameDialogComponent,
    AddReminderDialogComponent,
    CustomSpinnerComponent,
    ConfirmationDialogComponent, 
    ImageCropperDialogComponent, TemplateOrBuildOwnDialogueComponent, AuthenticatorDialogComponent, EditorSignatureDialogComponent, GoogleMapSuggestionComponent, WarningScreensDialogComponent,
    AIPolicyDialogComponent,
    MarkdownToHtmlPipe,
    DeleteFolderConfirmationDialogComponent,
    DeleteRoleDialogComponent,
    AddEditFolderComponent,
    AddToFolderComponent,
    AIResponseConfirmationDialogComponent,
    AiPolicyConfirmationDialogueComponent,
    TopupAicreditsComponent,
    SafeHtmlPipe,
    BlockBuilderSignatureDialogueComponent,
    DragDropFilesComponent,
    FileViewersComponent,
    ChooseTemplatesComponent,
    DownloadPdfModeComponent,
    ConfirmationDialogNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatStepperModule,
    MatMenuModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    MatButtonModule,
    MatSortModule,
    MatButtonToggleModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    ImageCropperComponent,
    SignatureModule,
    NgxMatSelectSearchModule,
    PdfViewerModule,
    DocumentEditorModule,
    DocumentEditorContainerModule,
    SpreadsheetModule,
    NgxDocViewerModule
  ],
  exports: [
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatRadioModule,
    MatStepperModule,
    MatMenuModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatMenuTrigger,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatSortModule,
    MatButtonToggleModule,
    MatStepperModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    PageHeaderToggleButtonComponent,
    MatSliderModule,
    MatProgressSpinnerModule,
    CustomSpinnerComponent,
    GoogleMapSuggestionComponent,
    MarkdownToHtmlPipe,
    SafeHtmlPipe,
    NgxMatSelectSearchModule,
    FileViewersComponent,
    ChooseTemplatesComponent
  ],
  providers: [
    ToolbarService
  ]
})
export class SharedModule {}
