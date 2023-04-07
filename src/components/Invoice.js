import { useMemo } from "react";
import moment from "moment";

const Invoice = ({ data }) => {

  
  const orderDetail = data?.data;
  console.log(orderDetail, "orderDetail");
  const { header } = orderDetail || {}
  const { incurredPayment } = header || {};
  const { type, amount: amountIncurredPayment } = incurredPayment || {};

  const { customer, employee, payment } = header || {};
  const { products, shippingPrice, shippingDiscount, invoice} = orderDetail?.deliveries?.[0] || {};
  const { fullAddress , code: deliveryCode } = orderDetail?.deliveries?.[0]?.store || {};
  const { method }  =  payment || {};

  const isPayOneLife = method?.method === 'ONELIFE';

  const invoiceCode = invoice?.code;

  const totalProduct = useMemo(() => {
    return Math.round(
      products?.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
      )
    );
  }, [products]);

  const totalPrice = useMemo(() => {
    return products?.reduce(
      (previousValue, currentValue) =>
        previousValue + Number(currentValue.sellPrice || 0) * Number(currentValue.quantity || 0),
      0
    );
  }, [products]);

  const shippingPriceTotal =shippingPrice;
    // useMemo(() => {
    //   return orderDetail?.deliveries?.reduce(
    //     (previousValue, currentValue) =>
    //       previousValue + Number(currentValue.shippingPrice),
    //     0
    //   );
    // }, [orderDetail?.deliveries]) || 0;
  const shippingDiscountTotal = shippingDiscount;
  //   useMemo(() => {
  //     return orderDetail?.deliveries?.reduce(
  //       (previousValue, currentValue) =>
  //         previousValue + Number(currentValue.shippingDiscount),
  //       0
  //     );
  // }, [orderDetail?.deliveries]) || 0;

  const amountCaculator = useMemo(() => {
    return Number(totalPrice) + Number(shippingPrice || 0) - Number(shippingDiscount);
  }, [shippingDiscount, shippingPrice, totalPrice]);

  const moneyNotPromotion = useMemo(() => {
    return products?.reduce(
      (previousValue, currentValue) =>
        previousValue + Number(currentValue.originPrice || 0) * Number(currentValue.quantity || 0),
      0
    );
  }, [products]);

  const saveMoney =
    Number(moneyNotPromotion) - Number(totalPrice) - Number(shippingDiscountTotal || 0);


  const renderIncurredPayment = useMemo(() => {
    switch (type) {
      case 'COD':
        return {
          label: 'Tiền thu thêm COD',
          amount: amountIncurredPayment,
        };
      case 'REFUND':
        return {
          label: 'Tiền hoàn trả',
          amount: amountIncurredPayment,
        };
      default:
        return null;
    }
  }, [amountIncurredPayment, type]);

  // if (isLoading) return <Loading />;

  if (orderDetail?.error)
    return (
      <div style={{
        textAlign: "center",
        marginTop: "47px"
      }}>
        <div>{orderDetail?.error}</div>
      </div>
    );

    return (
      <div
        style={{
          fontFamily: 'Inter',
          fontSize: '20px',
          lineHeight: '28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          id="invoice-wp"
        >
          <div id="invoice" style={{ width: '477px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src="https://oms.seedcom.me/logo-kfm.png" />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ width: '85%', marginBottom: '23px', textAlign: 'center' }}>
                    ĐC: Kingfoodmart - {fullAddress}
                  </span>
                  {/* <span>
                    Mã cửa hàng: {deliveryCode} · Mã NV: {employee?.employeeId || '--'}
                  </span> */}
                  <span>
                    Điện thoại: 18006804
                  </span>
                </div>
                <div
                  style={{ border: '1px dashed #000000', margin: '16px 0px', width: '100%' }}
                ></div>
                <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 'bold',}}>
                  HOÁ ĐƠN BÁN HÀNG
                </h1>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: "16px"
                }}
              >
                <span>Số HD: {invoiceCode || '--'}</span>
                <span>Mã đơn hàng: {orderDetail?.header?.code}</span>
                <span>
                  Ngày {moment(orderDetail?.header?.orderTime).format('DD')} 
                  tháng {moment(orderDetail?.header?.orderTime).format('MM')} 
                  năm {moment(orderDetail?.header?.orderTime).format('YYYY')} 
                  &nbsp;&nbsp;&nbsp; 
                  Giờ {moment(orderDetail?.header?.orderTime).format('HH:mm')} 
                </span>
                <span>Khách hàng: {customer?.name}</span>
                <span>
                  SDT:
                  {customer?.phone?.toString()?.slice(0, customer?.phone?.length - 3)} ***
                </span>
                <div
                  style={{ border: '1px dashed #000000', margin: '15px 0px', width: '100%' }}
                ></div>
                <div
                  style={{
                    display: 'flex',
                    margin: '10px 0px',
                    marginTop: '10px',
                  }}
                >
                  <div style={{ width: '47%', fontWeight: 'bold', textAlign: 'left' }}>Đơn giá</div>
                  <div style={{ width: '25%', fontWeight: 'bold' }}>SL</div>
                  <div style={{ width: '25%', fontWeight: 'bold', textAlign: 'right' }}>
                    Thành tiền
                  </div>
                </div>
                {products?.map((product, index) => {
                  const { originPrice, sellPrice } = product || {};
                  const discount = Math.floor(
                    ((Number(originPrice) - Number(sellPrice)) / Number(originPrice)) * 100
                  );
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '10px 0',
                      }}
                    >
                      <div style={{ width: '100%' }}>
                        {product?.name} {product.unit && `(${product?.unit})`}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                        }}
                      >
                        <div style={{ width: '47%' }}>
                          {sellPrice === originPrice && (
                            <span>{new Intl.NumberFormat().format(originPrice) || 0}</span>
                          )}
                          {sellPrice !== originPrice && (
                            <>
                              <span
                                style={{
                                  textDecoration: 'line-through',
                                  marginRight: '10px',
                                }}
                              >
                                {new Intl.NumberFormat().format(originPrice) || 0}
                              </span>
                              <span>{new Intl.NumberFormat().format(sellPrice) || 0}</span>
                              {Boolean(discount) && (
                                <span
                                  style={{
                                    marginLeft: '10px',
                                  }}
                                >
                                  (-{discount}%)
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        <div style={{ width: '25%' }}>{product?.quantity}</div>
                        <div style={{ width: '25%', textAlign: 'right', fontWeight: "bold" }}>
                          <span>
                            {' '}
                            {new Intl.NumberFormat().format(
                              Number(sellPrice || 0) * Number(product.quantity || 0)
                            ) || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ border: '1px dashed #000000', margin: '15px 0px', width: '100%' }}></div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Tổng số lượng:</span>
                  <span style={{fontWeight: "bold"}}>{totalProduct}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Tổng tiền hàng:</span>
                  <span style={{fontWeight: "bold"}}>{new Intl.NumberFormat().format(totalPrice) || 0}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Phí vận chuyển:</span>
                  <span style={{fontWeight: "bold"}}>{new Intl.NumberFormat().format(shippingPriceTotal) || 0}</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Giảm phí vận chuyển:</span>
                  <span style={{fontWeight: "bold"}}>
                    {Boolean(shippingDiscountTotal) && '-'}
                    {new Intl.NumberFormat().format(shippingDiscountTotal) || 0}
                  </span>
                </div>
              </div>
              <div style={{ border: '1px dashed #000000', margin: '15px 0px', width: '100%' }}></div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>Tộng cộng:</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {Boolean(saveMoney) && (
                      <span style={{fontSize: "16px"}}>Tiết kiệm {new Intl.NumberFormat().format(saveMoney) || 0}</span>
                    )}
                    <span style={{fontWeight: "bold"}}>{new Intl.NumberFormat().format(amountCaculator) || 0}</span>
                  </div>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{isPayOneLife ? "Khách thanh toán thẻ Onelife" : "Tiền khách đưa"}:</span>
                  <span style={{fontWeight: "bold"}}>{new Intl.NumberFormat().format(amountCaculator) || 0}</span>
                </div>
                {renderIncurredPayment && (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ textAlign: 'right' }}>
                      <span>{renderIncurredPayment?.label}:</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{fontWeight: "bold"}}>
                        {new Intl.NumberFormat().format(renderIncurredPayment?.amount || 0) || 0}
                      </span>
                    </div>
                  </div>
                )}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <span>Tổng điểm còn lại:</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{fontWeight: "bold"}}>--</span>
                  </div>
                </div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <span>Tiền còn trong thẻ:</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{fontWeight: "bold"}}>--</span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  marginTop: '24px',
                }}
              >
                <div style={{ width: '47%' }}>
                  <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
                  <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: "24px"
                  }}
                >
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>ĐẶT HÀNG ONLINE</span>
                  <span>Truy cập mua hàng online : <strong>onelife.vn</strong></span>
                </div>
                <div style={{ width: '47%', marginTop: "24px" }}>
                  <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
                  <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
                </div>
              </div>
              <span style={{ fontSize: '24px', marginTop: "24px", textAlign: "center",  fontWeight: 'bold' }}>QUY ĐỊNH ĐỔI / TRẢ HÀNG HÓA</span>
              <div
                style={{
                  display: 'flex',
                  gap: 5,
                  marginTop: '15px',
                  flexDirection: 'column',
                  textAlign: "justify"
                }}
              > 
              <span>- Thời gian giải quyết khiếu nại: 24h kể từ khi xuất hóa đơn</span>
              <span>- Chấp nhận đổi trả khi sản phẩm còn nguyên bao bì (Áp dụng đối với các sản phẩm được phép đổi trả theo quy định của Kingfoodmart)</span>
              <span>- Liên hệ CSKH: <strong>18006804</strong> (7:00 - 21:00 hàng ngày)</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: "24px"
                }}
              >
                <div style={{ width: '47%' }}>
                  <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
                  <div style={{ border: '1px dashed #000000', margin: '15px 0px' }}></div>
                </div>
              </div>                             
              <div
                style={{
                  display: 'flex',
                  marginTop: '24px',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
                  Tải ứng dụng OneLife để sử dụng thẻ ngay hôm nay
                </span>
                <span style={{ textAlign: 'center', marginTop: "16px"}}>
                  Dùng Thẻ OneLife - Kingfoodmart để hưởng <br/><strong>Freeship</strong> và{' '}
                  <strong>nhận thêm giá trị Thẻ nạp</strong>
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '16px',
              }}
            >
              <img src="https://oms.seedcom.me/qr.jpeg" width="158" height="158" />
            </div>
          </div>
        </div>
      </div>
    );
}
export default Invoice;