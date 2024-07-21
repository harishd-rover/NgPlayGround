import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDownloadComponent } from './file-upload-download.component';

describe('FileUploadDownloadComponent', () => {
  let component: FileUploadDownloadComponent;
  let fixture: ComponentFixture<FileUploadDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadDownloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
