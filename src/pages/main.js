import React, { useEffect, useState } from "react";
import { Button, Icon, Image } from "components/elements";
import { useDispatch } from "react-redux";
import { onClose } from "redux/actions/app";
import { Loading } from "components/elements/Loading";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";
import { FormInput } from "components/elements/Form";
import { FormSelect } from "components/elements/Form/FormSelect";
import { SERVICE_ASYNC } from "services/async";
import { map } from "lodash";
import useSound from 'use-sound';
import soundUrl from 'assets/media/beautiful_in_white.mp3';

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập họ và tên !').min(5, 'Vui lòng nhập chính xác họ và tên'),
});

export const Main = () => {
  // NOTE : PREFIX
  const prefixCls = 'page-main';
  const prefixSection = 'section';
  const prefixForm = 'section';
  // NOTE : CONSTANTS
  const dispatch = useDispatch();
  // Tạo mảng từ 01 đến 30
  const numbers = Array.from({ length: 30 }, (_, index) => index + 1);
  // Thêm các số từ 27 đến 31 vào đầu mảng
  const calendar06 = [27, 28, 29, 30, 31, ...numbers];

  // NOTE : Calendar
  const [daysInMonth, setDaysInMonth] = useState([]);
  const generateCalendar = () => {
    const month = 6;
    const year = 2024;
    const daysInMonthFn = [];

    // Số ngày trong tháng
    const totalDays = new Date(year, month, 0).getDate();

    // Ngày đầu tiên của tháng
    const firstDay = new Date(year, month - 1, 1).getDay();

    // Thêm các ngày trước tháng
    const prevMonthDays = new Date(year, month - 1, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      daysInMonthFn.push({ day: prevMonthDays - i, class: 'prev-month' });
    }

    // Thêm các ngày trong tháng
    for (let i = 1; i <= totalDays; i++) {
      daysInMonthFn.push({ day: i, class: i === 2 ? 'special-day' : '' });
    }

    // Thêm các ngày sau tháng
    const lastDay = new Date(year, month, 0).getDay();
    const nextMonthDays = 7 - lastDay - 1;
    for (let i = 1; i <= nextMonthDays; i++) {
      daysInMonthFn.push({ day: i, class: 'next-month' });
    }

    setDaysInMonth(daysInMonthFn);
  };
  // NOTE : EFFECT
  useEffect(() => {
    generateCalendar();
  }, [])
  // NOTE : FUNCTIONS
  const handleClose = () => {
    dispatch(onClose());
  }
  // NOTE : Form
  const submitForm = async (data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const formURL = 'https://docs.google.com/forms/d/e/1FAIpQLSeLTsng2UEQEoS1cDPjiA73hQFmrVTlhAWGKs_peAz_cRXZYA/formResponse';
    const fieldName = 'entry.182216336';
    const fieldPhone = 'entry.2106471490';
    const fieldContent = 'entry.1384180068';
    const fieldThinking = 'entry.1034108493';
    let formData = new FormData();

    formData.append(fieldName, data.name);
    formData.append(fieldPhone, data.phone);
    formData.append(fieldContent, data.content);
    formData.append(fieldThinking, data.thinking.value);
    console.log('====================================');
    console.log({ formData });
    console.log('====================================');
    let res = await fetch(formURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    })
    console.log('====================================');
    console.log({ res });
    console.log('====================================');
  }
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  // NOTE : Player
  const [play, { stop }] = useSound(soundUrl);
  const [isPlaying, setPlaying] = useState(false);
  const playMusic = () => {
    console.log('====================================');
    console.log(isPlaying);
    console.log('====================================');
    if (isPlaying) {
      stop();
      setPlaying(false);
    } else {
      play();
      setPlaying(true);
    }
  }
  console.log('====================================');
  console.log({isPlaying});
  console.log('====================================');
  const RNPlayer = () => {
    return (
      <div className="player-float">
        <div className="player">
          <div className="player-content">
            <div className={classNames('album-art', isPlaying && "active")}>
              <img src={require('../assets/images/pictures/1NHA2416.webp')} />
              <div className="buffer-box">Buffering ...</div>
            </div>
            <div className="player-controls">
              <div className="control">
                <Button onClick={playMusic}><Icon name={ isPlaying ? 'pause' : 'play'} /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // NOTE : RN
  return (
    <>
      <main className={prefixCls}>
        {RNPlayer()}
        <div className={`${prefixSection}-block-1`}>
          <div className={`${prefixSection}-card`}>
            <div className={`${prefixSection}-card-item`}>
              <div className={`${prefixSection}-card-item__inner`}>
                <div className={`${prefixSection}-card-item__image`}>
                  <Image src={require('../assets/images/pictures/1NHA2416.webp')} />
                </div>
                <div className={`${prefixSection}-card-item__text`}>
                  <span>02</span>
                </div>
              </div>
            </div>
            <div className={`${prefixSection}-card__item`}>
              <div className={`${prefixSection}-card-item__inner`}>
                <div className={`${prefixSection}-card-item__image`}>
                  <Image src={require('../assets/images/pictures/1NHA2466.webp')} />
                </div>
                <div className={`${prefixSection}-card-item__text`}>
                  <span>06</span>
                </div>
              </div>
            </div>
            <div className={`${prefixSection}-card__item`}>
              <div className={`${prefixSection}-card-item__inner`}>
                <div className={`${prefixSection}-card-item__image`}>
                  <Image src={require('../assets/images/pictures/1NHA2437.webp')} />
                </div>
                <div className={`${prefixSection}-card-item__text`}>
                  <span>24</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${prefixSection}-typography`}>
            <div className={`${prefixSection}-typography-text`}>
              <span>Thanh Thắng</span>
              <span><Image src={require('../assets/images/pictures/4e37162a-1813-47ec-84aa-93c6a449996b.webp')} /></span>
              <span>Trúc Vy</span>
            </div>
          </div>
        </div>
        <div className={`${prefixSection}-block-2`}>
          <div className={`${prefixSection}-block-background`}></div>
          <div className={`${prefixSection}-block-text`}>
            <h5>WEDDING</h5>
            <span>invitation</span>
          </div>
        </div>
        <div className={`${prefixSection}-block-3`}>
          <div className={`${prefixSection}-container`}>
            <div className={`${prefixSection}-block-title`}>
              <div className={`${prefixSection}-block-title__text`}>
                <span>SAVE</span>
                <span>THE</span>
                <span>DATE</span>
              </div>
            </div>
            <div className={`${prefixSection}-block-typography`}>
              <span>Âu Thanh Thắng</span>
              <span>and</span>
              <span>Cao Thị Trúc Vy</span>
            </div>
            <div className={`${prefixSection}-block-element`}>
              <div className={`${prefixSection}-block-text`}>
                <span>09:00</span>
                <span>Chủ nhật</span>
              </div>
              <div className={`${prefixSection}-block-text`}>
                <span>Tháng 06</span>
                <span>02</span>
                <span>(Nhầm ngày 26 tháng 4 năm Giáp Thìn)</span>
              </div>
              <div className={`${prefixSection}-block-text`}>
                <span>20</span>
                <span>24</span>
              </div>
            </div>
            <div className={`${prefixSection}-block-address`}>
              <span>Nhà hàng tiệc cưới <strong>Phương Nhi</strong></span>
              <span>(01 Quang trung - Phú túc - Krông Pa - Gia Lai)</span>
            </div>
            <div className={`${prefixSection}-block-calendar`}>
              <h5>Tháng 6 - 2024</h5>
              <table>
                <thead>
                  <tr>
                    <th>CN</th>
                    <th>Thứ 2</th>
                    <th>Thứ 3</th>
                    <th>Thứ 4</th>
                    <th>Thứ 5</th>
                    <th>Thứ 6</th>
                    <th>Thứ 7</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3, 4, 5].map(week => (
                    <tr key={week}>
                      {[0, 1, 2, 3, 4, 5, 6].map(day => {
                        const index = week * 7 + day;
                        return (
                          <td
                            key={day}
                            className={daysInMonth[index] ? daysInMonth[index].class : ''}
                          >
                            {daysInMonth[index] && daysInMonth[index].day}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={`${prefixSection}-block-4`}>
          <div className={`${prefixSection}-container`}>
            <div className={`${prefixSection}-block-header`}>
              <h5>Our photobook</h5>
            </div>
            <div className={`gallery`}>
              <figure className="gallery__item gallery__item--1">
                <img src={require('../assets/images/pictures/photobook/1NHA2450.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--2">
                <img src={require('../assets/images/pictures/photobook/1NHA2711.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--3">
                <img src={require('../assets/images/pictures/photobook/1NHA2437.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--4">
                <img src={require('../assets/images/pictures/photobook/1NHA2424.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--5">
                <img src={require('../assets/images/pictures/photobook/1NHA2786.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--6">
                <img src={require('../assets/images/pictures/photobook/1NHA2707.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--7">
                <img src={require('../assets/images/pictures/photobook/1NHA2416.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--8">
                <img src={require('../assets/images/pictures/photobook/1NHA2466.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--9">
                <img src={require('../assets/images/pictures/photobook/1NHA2553.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--10">
                <img src={require('../assets/images/pictures/photobook/1NHA2613.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
              <figure className="gallery__item gallery__item--11">
                <img src={require('../assets/images/pictures/photobook/1NHA2445.webp')} alt="Wedding Thang & Vy" className="gallery__img" />
              </figure>
            </div>
          </div>
        </div>
        <div className={`${prefixSection}-block-5`}>
          <div className={`${prefixSection}-container`}>
            <div className={`${prefixSection}-block-header`}>
              <h5>BẠN SẼ THAM DỰ CHỨ ?</h5>
              <p>Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt như đám cưới của chúng tôi. Đám cưới của chúng tôi sẽ trọn vẹn hơn khi có thêm lời chúc phúc và sự hiện diện của các bạn. Xin hãy xác nhận sự có mặt của mình để chúng tôi chuẩn bị đón tiếp một cách chu đáo nhất nhé! Trân trọng!</p>
            </div>
            <div className={`${prefixSection}-block-form`}>
              <div className={classNames(`${prefixSection}-form-block`)}>
                <FormInput
                  label='Họ và tên *'
                  name="name"
                  autoFocus
                  floating={true}
                  register={register} required hint={errors?.name?.message} status={errors?.name?.message ? 'error' : ''} />
              </div>
              <div className={classNames(`${prefixSection}-form-block`)}>
                <FormInput
                  label='Số điện thoại'
                  name="phone"
                  autoFocus
                  floating={true}
                  register={register} />
              </div>
              <div className={classNames(`${prefixSection}-form-block`)}>
                <FormInput
                  label='Gửi những lời chúc tốt đẹp'
                  name="content"
                  autoFocus
                  floating={true}
                  register={register} />
              </div>
              <div className={classNames(`${prefixSection}-form-block`)}>
                <FormSelect
                  control={control}
                  label="Bạn sẽ tham gia chứ ?"
                  placeholder="Bạn sẽ tham gia chứ ?"
                  name='thinking'
                  options={[
                    { label: "Chắc chắn rồi, tui sẽ đến đám cưới bạn", value: "Chắc chắn rồi, tui sẽ đến đám cưới bạn" },
                    { label: "Hôm đó tui bận rồi", value: "Hôm đó tui bận rồi" },
                  ]}
                />
              </div>
              <div className={classNames(`${prefixSection}-form-block ${prefixSection}-form-btn`)}>
                <Button className='btn-primary' onClick={handleSubmit(submitForm)}>Phản hồi</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefixSection}-block-6`}>
          <div className={`${prefixSection}-container`}>
            <div className={`${prefixSection}-block-header`}>
              <h5>♥ Hộp mừng cưới ♥</h5>
              <p>Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt như đám cưới của chúng mình!</p>
            </div>
            <div className={`${prefixSection}-block-qrcode`}>
              <div className="qrcode">
                <img src={require('../assets/images/pictures/qrcode-1.webp')} alt="Hộp mừng cưới" />
              </div>
              <div className="qrcode">
                <img src={require('../assets/images/pictures/qrcode-2.webp')} alt="Hộp mừng cưới" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>© 2024 by ATT</p>
        </div>
      </footer>
    </>
  )
}
