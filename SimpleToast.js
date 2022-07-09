import { NativeModules, Platform } from 'react-native';

const RCTToast = Platform.select({
  ios: NativeModules.LRDRCTSimpleToast,
  android: require('react-native').ToastAndroid,
});

export default {

  show(message, duration, viewControllerBlacklist) {
    RCTToast.show(
      message,
      duration === undefined ? RCTToast.SHORT : duration,
      viewControllerBlacklist
    );
  },

  showWithGravity(message, duration, gravity, viewControllerBlacklist) {
    RCTToast.showWithGravity(
      message,
      duration === undefined ? RCTToast.SHORT : duration,
      gravity,
      viewControllerBlacklist
    );
  },
};