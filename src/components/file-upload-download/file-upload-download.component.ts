import { Component, ElementRef, viewChild } from '@angular/core';
import { logInBlue } from '../../utilities/logger.utility';

@Component({
  selector: 'app-file-upload-download',
  standalone: true,
  imports: [],
  templateUrl: './file-upload-download.component.html',
  styleUrl: './file-upload-download.component.css'
})
export class FileUploadDownloadComponent {

  private fileUploadElemantRef = viewChild.required('fileUpload', { read: ElementRef<HTMLInputElement> });



  handleFileUpload(event: Event) {
    console.clear();
    console.log(this.fileUploadElemantRef().nativeElement);
    let file = (event.target as HTMLInputElement).files![0];

    let blob = new Blob([file], { type: file.type })

    blob.arrayBuffer().then(arrayBuiffer => {
      console.log("Array Buffer from Blob : ", arrayBuiffer);
    })

    console.log("File Selected : ", file);

    file.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
      console.log("Array Buffer from File : ", arrayBuffer);


      // for Uint8Array -> arrayBuffer ByteLength can be aanything.
      console.log("Uint8Array TypedArray/Data View : ", new Uint8Array(arrayBuffer));

      // for Uint16Array -> arrayBuffer ByteLength should be multiple of 2.
      // console.log("Uint16Array TypedArray/Data View: ", new Uint16Array(arrayBuffer));

      // for Uint32Array -> arrayBuffer ByteLength should be multiple of 4.
      // console.log("Uint32Array TypedArray/Data View: ", new Uint32Array(arrayBuffer));

      // for Float64Array -> arrayBuffer ByteLength should be multiple of 8.
      // console.log("Float64Array TypedArray/Data View: ", new Float64Array(arrayBuffer));


      const blobPart: BlobPart | ArrayBufferView = new Int8Array(arrayBuffer);


      const blobPartArray: BlobPart[] | ArrayBufferView[] = [new Uint8Array(arrayBuffer)];

      const blob = new Blob(blobPartArray, { type: file.type });
      console.log("Blob from Array buffer : ", blob)

      const newFile = new File(blobPartArray, file.name)
      console.log("File from Array buffer : ", newFile);

      console.log('File from Blob : ', new File([blob], 'my-file', { type: blob.type }))

      console.log('Blob from File : ', new Blob([file], { type: file.type }))


      console.log("BlobURL form blob : ", URL.createObjectURL(blob))  // blob URL
      console.log("BlobURL form file : ", URL.createObjectURL(newFile))  // blob URL
    })


    // setTimeout(()=>{
    //   window.open(URL.createObjectURL(file),'_blank');
    // }, 0)

    const fileReader = new FileReader();
    fileReader.onload = event => {
      const dataURL = event.target?.result
      console.log("dataURL", dataURL);  // dataURL
    };
    fileReader.readAsDataURL(blob);
    // fileReader.readAsDataURL(file);



    // new Blob([file], { type: file.type }).text().then(text => {
    //   console.log("Text from Blob : ", text);
    // })
    file.text().then(text => {
      console.log("Text from File : ", text);
    })
  }

}
