import { useState, useCallback } from "react";
function UseCaptcha() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const handleRecaptchaChange = useCallback((value) => {
    setCaptchaValue(value);
  }, []);

  return {
    captchaValue,
    handleRecaptchaChange,
  };
  // eslint-disable-next-line no-undef
}

export default UseCaptcha;
