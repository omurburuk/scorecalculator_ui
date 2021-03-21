 class Api{
    async PostFunction(method:any, body:any){
        let result=await(await (fetch(method,
                {
                    method:'post',
                    headers: {
                        'Accept': 'application/json',
                        "access-control-allow-origin" : "*",
                        "Content-type": "application/json; charset=UTF-8"
                    } ,
                    body: JSON.stringify(body)
                })
                .then(res => {
                    return res.json()
                })
                .catch(err => {
                    console.log('Error: ', err)
                })
        ))
        return result;
    }


    async GetFunction(method:any){

        let result=await(await (fetch(method)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('responseJson: ',responseJson)
                    return responseJson;
                })
                .catch(err => {
                    console.log('Error: ', err)
                })
        ))
        return result;
    }
     async UploadFunction(method:any, body:any){
         /*Alert.alert("Yükleniyor % "+this.state.uploadProgress,
         "Lütfen bekleyiniz..");
         Alert.alert("Yükleniyor.. ",
         "Lütfen bekleyiniz..");*/
         let result=await(await (fetch(method,
                 {
                     method:'post',
                     headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'multipart/form-data'
                     },
                     body:body,

                 })
                 .then(res => {
                     return res.json()
                 })
                 .catch(err => {
                     console.log('Error: ', err)
                 })
         ))
         return result;
     }
    serializeKey(data:any) {
        let formBody :any=[];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }

}
 export default new Api();