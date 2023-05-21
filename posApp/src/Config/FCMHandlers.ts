const MSGTypes = {
  ACCEPT: '11',
  CANCEL: '13',
  COMMIT: '14',
  ABORT: '15',
  DISCARD: '16',
  RIDE_START: '20',
  RIDE_FINISH: '21',
  RIDE_CHAT: '22',
  RIDE_GPS: '23',
};

const HandleBackgroundMsg = async (msg: any) => {
  // console.log('RECEIVE MSG IN BACKGROUND', msg);
  handleFCMReceived(msg);
  // In background we need to flag a notification
  return Promise.resolve({issues: 0});
};

const HandleForegroundMsg = (msg: any) => {
  // console.log('RECEIVE MSG IN FOREGROUND', msg);
  // In foreground there is nothing else to do.
  handleFCMReceived(msg);
};

const handleFCMReceived = (msg: {
  data: {
    msgType: string;
  };
}) => {
  console.log('message ', msg);

  switch (msg.data.msgType) {
    case MSGTypes.ACCEPT:
      break;
    case MSGTypes.DISCARD:
      console.log('DISCARSD Msg');
      break;
  }
};

export {HandleBackgroundMsg, HandleForegroundMsg};
