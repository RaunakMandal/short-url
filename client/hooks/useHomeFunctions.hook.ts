import axios from "axios";
import { useState } from "react";

export type T_URLProps = {
  url: string;
  password: string;
  shortUrl: string;
  status: string;
  isUrlValid?: boolean;
  loading: boolean;
};

export const useHomeFunctions = () => {
  const [urlObj, setUrlObj] = useState<T_URLProps>({
    url: "",
    password: "",
    shortUrl: "",
    status: "",
    isUrlValid: true,
    loading: false,
  });

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlObj({ ...urlObj, [e.target.name]: e.target.value, isUrlValid: true, status: "", shortUrl: "" });
  };

  const handleApiCall = () => {
    if (!validateUrl(urlObj.url)) {
      setUrlObj({ ...urlObj, isUrlValid: false });
      return;
    }

    const urlReq = {
        url: urlObj.url,
        password: urlObj.password,  
    };

    axios
      .post("/api/generateShortUrl", urlReq)
      .then((res) => {
        setUrlObj({ ...urlObj, shortUrl: 
            `${process.env.NEXT_PUBLIC_BASE_URL}/${res.data.shortUrl}`
            , status: res.data.message });
      })
      .catch((err) => {
        setUrlObj({ ...urlObj, status: err.response.data.message });
      });
  };

  return { urlObj, handleDataChange, handleApiCall };
};
