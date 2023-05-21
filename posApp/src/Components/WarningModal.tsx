import React, {Component} from 'react';
import {Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import {Colors} from '../Utils/Colors';
import {INFO_IC} from '../Utils/Images';

interface IProps {
  modalVisible: boolean;
  message: string;
  handleCloseModal: () => void;
}
export class WarningModal extends Component<IProps, any> {
  render() {
    const {modalVisible, message, handleCloseModal} = this.props;
    return (
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image source={INFO_IC} style={{marginBottom: 20}} />
              <Text style={styles.modalTitle}>Atención</Text>

              <Text style={styles.modalText}>{message}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleCloseModal}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 40,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'black',
    marginTop: 25,
    minWidth: 150,
    paddingVertical: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.Black,
    fontSize: 15,
  },
  modalTitle: {
    textAlign: 'center',
    color: Colors.Black,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
