import React, { useState } from 'react';
import {
  PopStyle,
  PopStyleDouble,
  PopStyleFourLines,
  PopSingleStyle,
  PopStyleFiveLines,
} from './style';
import { BsThreeDots } from 'react-icons/bs';

const Popover = (props: any) => {
  // console.log(`props`, props.num )
  // console.log(`props.quant`, props.quant)
  const [visible, setVisible] = useState(false);

  const visibleHandler = () => {
    setVisible(!visible);
  };

  if (props.quant === 1) {
    return (
      <>
        <PopSingleStyle>
          <BsThreeDots onClick={visibleHandler} />
          {visible && (
            <div
              onMouseLeave={() => setVisible(false)}
              /*  className={props.num === 7 ? "last-prop" : props.num === 6 ? "beforeLast-prop" : ""} */
            >
              {props?.content?.map((item: any, i: any) => (
                <p key={i} onClick={item.onClick}>
                  {item.optionName}
                </p>
              ))}
            </div>
          )}
        </PopSingleStyle>
      </>
    );
  }

  if (props.quant === 2) {
    return (
      <>
        <PopStyleDouble>
          <BsThreeDots onClick={visibleHandler} />
          {visible && (
            <div
              onMouseLeave={() => setVisible(false)}
              /*  className={props.num === 7 ? "last-prop" : props.num === 6 ? "beforeLast-prop" : ""} */
            >
              {props?.content?.map((item: any, i: any) => (
                <p key={i} onClick={item.onClick}>
                  {item.optionName}
                </p>
              ))}
            </div>
          )}
        </PopStyleDouble>
      </>
    );
  }

  if (props.quant === 4) {
    return (
      <>
        <PopStyleFourLines>
          <BsThreeDots onClick={visibleHandler} />
          {visible && (
            <div
              onMouseLeave={() => setVisible(false)}
              className={
                props.num === 7
                  ? 'last-prop'
                  : props.num === 6
                  ? 'beforeLast-prop'
                  : ''
              }
            >
              {props?.content?.map((item: any, i: any) => (
                <p className={item.className} key={i} onClick={item.onClick}>
                  {item.optionName}
                </p>
              ))}
            </div>
          )}
        </PopStyleFourLines>
      </>
    );
  }

  if (props.quant === 5) {
    return (
      <>
        <PopStyleFiveLines>
          <BsThreeDots onClick={visibleHandler} />
          {visible && (
            <div
              onMouseLeave={() => setVisible(false)}
              className={
                props.num === 7
                  ? 'last-prop'
                  : props.num === 6
                  ? 'beforeLast-prop'
                  : props.num === 5
                  ? 'numberFive-prop'
                  : ''
              }
            >
              {props?.content?.map((item: any, i: any) => (
                <p className={item.className} key={i} onClick={item.onClick}>
                  {item.optionName}
                </p>
              ))}
            </div>
          )}
        </PopStyleFiveLines>
      </>
    );
  }

  return (
    <>
      <PopStyle>
        <BsThreeDots onClick={visibleHandler} />
        {visible && (
          <div
            onMouseLeave={() => setVisible(false)}
            className={
              props.num === 7
                ? 'last-prop'
                : props.num === 6
                ? 'beforeLast-prop'
                : ''
            }
          >
            {props?.content?.map((item: any, i: any) => (
              <p className={item.className} key={i} onClick={item.onClick}>
                {item.optionName}
              </p>
            ))}
          </div>
        )}
      </PopStyle>
    </>
  );
};

export default Popover;
