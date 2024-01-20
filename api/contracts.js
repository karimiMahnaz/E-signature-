import http from ".";
import axios from 'axios';

export const ocr = async (email, uploadImage0, signatureBase64, subTitleBase64, signDateBase64) => {
    console.log('http.url***2',http.url)
    console.log('email***2',email)

    let path = "";
    if (Platform.OS === 'ios'){
        path = './uploaded-files/' + email.replace('"', '').trim().replace('"', '').trim().toLowerCase() +'_OCR/'+uploadImage0.filename
    }
    if (Platform.OS === 'android'){
         path = './uploaded-files/' + email.replace('"', '').trim().replace('"', '').trim().toLowerCase() +'_OCR/'+
         uploadImage0.path.substring(uploadImage0.path.lastIndexOf('/') + 1, uploadImage0.path.length).split('.')[0]+'.pdf';
    }

    try {
    
        const status  = await http.post(
            `${http.url}/api/contract/ocr`,
               {path, signatureBase64, subTitleBase64, signDateBase64} , { timeout: 220000 }
        );
        console.log('status', status);
  
        return status;
    } catch (err) {
        console.log(err);
    }
};

export const fileUpload = async (email, uploadImage0) => {
    console.log('http.url***',http.url)
    console.log('email***',email)
    try {
        
        const key = "myFile";
        const formData = new FormData();
        let media = "";

        if (Platform.OS === 'ios'){
          media = {
            uri: uploadImage0.path,
            type: uploadImage0.mime,
            name: uploadImage0.filename,
            originalname: uploadImage0.filename,
            encoding: uploadImage0.encoding,
          }
        }
          if (Platform.OS === 'android'){
            console.log('uploadImage0', uploadImage0.path.substring(uploadImage0.path.lastIndexOf('/') + 1, uploadImage0.path.length))
           media = {
            uri: uploadImage0.path,
            type: uploadImage0.mime,
            name:uploadImage0.path.substring(uploadImage0.path.lastIndexOf('/') + 1, uploadImage0.path.length),
            originalname:uploadImage0.path.substring(uploadImage0.path.lastIndexOf('/') + 1, uploadImage0.path.length),
            encoding: uploadImage0.encoding,
        }
    }

        formData.append(`${key}`, media);

           axios({
                method: "post",
                url:   `${http.url}/api/file`,
                data: formData,
                'headers': {
                       'content-type': 'multipart/form-data',
                       'category':  email.replace('"', '').trim().replace('"', '').trim() +'_OCR'
                }
            })
              
            return 200;
                
        }
     catch (err) {
        console.log(err);
        return err;
    }
};