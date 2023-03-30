
// import  clipboardy from 'clipboardy';
let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

const nodeHtmlToImage = require('node-html-to-image')

export default  async function handler(req, res) {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ['--disable-extensions']}
    };
  
  try {
    await puppeteer.launch(options);
    const data = await generateImage();   
    res.status(200).send(data)
  } catch (err) {
    console.error(err);
  }
}

// export const config = {
//   api: {
//     bodyParser: false, // Defaults to true. Setting this to false disables body parsing and allows you to consume the request body as stream or raw-body.
//     responseLimit: false, // Determines how much data should be sent from the response body. It is automatically enabled and defaults to 4mb.
//     externalResolver: true, // Disables warnings for unresolved requests if the route is being handled by an external resolver like Express.js or Connect. Defaults to false.
//   },
// }


async function generateImage() {
  const htmlFile = `<html>
    <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"/>
      <style>
        body {
          padding: 15px; 
          width: 452px; 
        }
      </style>
    </head>
    <div id="invoice">
      <div style="display: flex; flex-direction: column; justify-content: center;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                <img width="28" height="28" src="https://i.postimg.cc/ykyMtVZy/one-life.png">
                <div style="display: flex; flex-direction: column;"><span style="font-size: 20px; font-weight: bold;">OneLife</span><span>Live it to the fullest</span></div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;"><span style="width: 85%; margin-bottom: 10px; text-align: center;">CH: 436-438 Nguyễn Thị Thập, Phường Tân Quy, Quận 7, TP.Hồ Chí Minh</span><span>Mã cửa hàng: HCM007011 · Mã NV: --</span></div>
            <div style="border: 1px dashed rgb(0, 0, 0); margin: 15px 0px; width: 100%;"></div>
            <h1 style="font-size: 25px; font-weight: bold; margin-bottom: 12px;">HOÁ ĐƠN BÁN HÀNG</h1>
          </div>
          <div style="display: flex; flex-direction: column;">
            <span>Thời gian: 18:22 03/02/2023</span><span>Số HD: OLKFM123456</span><span>Khách hàng: Nguyễn Ngọc Thịnh</span><span>SDT: ******9426</span>
            <div style="margin: 15px 0px;"></div>
            <div style="border: 1px dashed rgb(0, 0, 0); margin: 15px 0px; width: 100%;"></div>
            <div style="display: flex; margin: 10px;">
                <div style="width: 50%; font-weight: bold;">Đơn giá</div>
                <div style="width: 25%; font-weight: bold;">SL</div>
                <div style="width: 25%; font-weight: bold; text-align: right;">Thành tiền</div>
            </div>
            <div style="display: flex; flex-direction: column; margin: 10px 0px;">
                <div style="width: 100%;">YOMOST - SỮA CHUA UỐNG CAM 170ML </div>
                <div style="display: flex;">
                  <div style="width: 50%;"><span>6,900</span></div>
                  <div style="width: 25%;">1</div>
                  <div style="width: 25%; text-align: right;"><span>32,000</span></div>
                </div>
            </div>
          </div>
          <div style="border: 1px dashed rgb(0, 0, 0); margin: 15px 0px; width: 100%;"></div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between;"><span>Tổng số lượng:</span><span>1</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Tổng tiền hàng:</span><span>6,900</span></div>
            <div style="width: 100%; display: flex; justify-content: space-between;"><span>Giảm giá hoá đơn:</span><span>--</span></div>
            <div style="width: 100%; display: flex; justify-content: space-between;"><span>Phí ship:</span><span>20,000</span></div>
          </div>
          <div style="border: 1px dashed rgb(0, 0, 0); margin: 15px 0px; width: 100%;"></div>
          <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="width: 100%; display: flex; justify-content: space-between;"><span>Tộng cộng:</span><span>26,900</span></div>
            <div style="width: 100%; display: flex; justify-content: space-between;"><span>Tiền khách đưa:</span><span>--</span></div>
            <div style="width: 100%; display: flex; justify-content: space-between;">
                <div style="text-align: right;"><span>Thanh toán bằng điểm (VNĐ):</span></div>
                <div style="text-align: right;"><span>--</span></div>
            </div>
            <div style="width: 100%; display: flex; justify-content: space-between;">
                <div style="text-align: right;"><span>Tổng điểm còn lại:</span></div>
                <div style="text-align: right;"><span>--</span></div>
            </div>
            <div style="width: 100%; display: flex; justify-content: space-between;">
                <div style="text-align: right;"><span>Thẻ:</span></div>
                <div style="text-align: right;"><span>--</span></div>
            </div>
          </div>
          <div style="display: flex; align-items: center; flex-direction: column; margin-top: 20px;">
            <div style="width: 55%;">
                <div style="border: 1px dashed rgb(0, 0, 0); margin: 15px 0px;"></div>
                <div style="border: 1px dashed rgb(0, 0, 0); margin: 15px 0px;"></div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; margin: 18px 0px;"><span style="font-size: 20px; font-weight: bold;">YÊU CẦU HỖ TRỢ</span><span><span>Liên hệ </span><strong>1800 6804</strong></span><span>(<strong>7:00 - 21:00</strong> · Trừ CN và ngày lễ)</span></div>
            <div style="width: 55%;">
                <div style="border: 1px dashed rgb(0, 0, 0); margin: 15px 0px;"></div>
                <div style="border: 1px dashed rgb(0, 0, 0); margin: 15px 0px;"></div>
            </div>
          </div>
          <div style="display: flex; gap: 5px; margin-top: 15px; flex-direction: column;"><span style="font-size: 24px; font-weight: bold; text-align: center;">Tải ứng dụng OneLife để sử dụng thẻ ngay hôm nay</span><span style="text-align: center;">Dùng Thẻ OneLife - Kingfoodmart để hưởng <strong>Freeship</strong> và <strong>nhận thêm giá trị Thẻ nạp</strong></span></div>
      </div>
      <div style="display: flex; justify-content: center; margin-top: 10px;">
      <img width="158" height="158" src="https://i.postimg.cc/yD6Mzwh4/qr.jpg"></div>
    </div>
  </html>`

  // const image_name = Math.random()
  // const relativePath = `output/${image_name}.png`
  // const output = `${process.env.SERVER_STATIC_URL}/${relativePath}`
  // console.log(output,'output')
  return await nodeHtmlToImage({
    encoding: "base64",
    html: htmlFile,
  }).then((output) => { 
    return output;
  })
    .catch((err) => {
      console.log('err')
      return err
    })
}