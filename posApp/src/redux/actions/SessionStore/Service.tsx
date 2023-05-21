import {Dispatch} from 'redux';
import {
  ERROR_CREDENTIALS_MESSAGE,
  ERROR_MESSAGE,
  ERROR_MESSAGE_NETWORK,
} from '../../../Utils/Commons';
import {ILoginBody} from '../../models/ModelApp';
import {fetchLogin} from '../../services/appService';
import {setLoading} from '../AppStore/Index';
import {setInformationToken} from '../SessionStore/Index';

export function loguinApp(
  body: ILoginBody,
  callbackResult?: () => void,
  callbackError?: (message: string, isNetworkError?: boolean) => void,
) {
  return (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    fetchLogin(body)
      .then((res: any) => {
        if (res.code === 'ERR_NETWORK') {
          callbackError(ERROR_MESSAGE_NETWORK, true);
          dispatch(setLoading(false));
          return;
        }
        const information = res.data;
        information.email = body.email;
        information.password = body.password;
        console.log('set information ', information);
        dispatch(setInformationToken(information || undefined));
        if (callbackResult) {
          callbackResult();
        }
        dispatch(setLoading(false));
      })
      .catch(res => {
        console.log(res);
        dispatch(setLoading(false));
        if (res.code === 'ERR_NETWORK') {
          if (callbackError) {
            callbackError(ERROR_MESSAGE_NETWORK, true);
          }
          return;
        }
        const response = res.response;
        switch (response.status) {
          case 400: {
            if (callbackError) {
              callbackError(response.data.data || ERROR_MESSAGE);
            }
            return;
          }
          case 401: {
            callbackError(ERROR_CREDENTIALS_MESSAGE);
            return;
          }
          default: {
            if (callbackError) {
              callbackError(
                (res && res.data && res.data.data) || ERROR_MESSAGE,
              );
            }
            return;
          }
        }
      });
  };
}
