import OSS from 'ali-oss'

  const region = "oss-cn-nanjing"
  const accessKeyId = "LTAI5tN8tqY8kUGp75Qa1r75"
  const accessKeySecret = "h6xFTWYVJVyXKNFE4Tx3fbVqan6Ysx"
  const bucket = "obj-extend"
  import { Message } from 'element-ui';
  let client = new OSS({
        region : region,
        accessKeyId : accessKeyId,
        accessKeySecret : accessKeySecret,
        bucket : bucket
  });

  const downloadFile = function (key) {
  console.log(key)
  let url = client.signatureUrl(key);
  let Img = new Image(), dataURL = '';
  let fileName = key.substring(key.indexOf('_')+1);
  Img.src = url;
  Img.setAttribute("crossOrigin", 'Anonymous');
  Img.onload = function () {
    let canvas = document.createElement("canvas"),
    width = Img.width,
    height = Img.height;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(Img, 0, 0, width, height);
    dataURL = canvas.toDataURL('image/png' );
    let eleLink = document.createElement('a');
    eleLink.download = fileName;
    eleLink.style.display = 'none';
    eleLink.href = dataURL;
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
  };
}
export default {
  install(Vue){
    Vue.prototype.Oss = {
      uploadFile : CooOss,
      downloadFile : downloadFile
    };
  }
};
