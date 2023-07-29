import Link from "next/link";
import { useHomeFunctions } from "../hooks/useHomeFunctions.hook";

export const HomeComponent = () => {
  const { urlObj, handleDataChange, handleApiCall } = useHomeFunctions();
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen tw-gap-4">
      <span className="tw-text-4xl tw-font-bold">Shorten your URL</span>
      <div className="tw-form-control tw-w-full tw-max-w-xs">
        <input
          name="url"
          type="text"
          placeholder="Enter long URL here"
          className="tw-input tw-input-bordered tw-w-full tw-max-w-xs"
          onChange={handleDataChange}
        />
        {!urlObj.isUrlValid && (
          <label className="tw-label">
            <span className="tw-label-text-alt tw-text-red-600 tw-font-bold">
              * The URL is invalid
            </span>
          </label>
        )}
      </div>
      <div className="tw-form-control tw-w-full tw-max-w-xs tw-gap-2">
        <input
          name="password"
          type="text"
          placeholder="Enter your password here"
          className="tw-input tw-input-bordered tw-w-full tw-max-w-xs"
          onChange={handleDataChange}
        />
      </div>
      {urlObj.status?.includes("success") && (
        <div className="tw-alert tw-w-2/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="tw-stroke-info tw-shrink-0 tw-w-6 tw-h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            Your short URL is{" "}
            <Link href={urlObj.shortUrl}>{urlObj.shortUrl}</Link>
          </span>
        </div>
      )}
      {urlObj.status?.includes("error") && (
        <div className="tw-alert tw-alert-error tw-w-2/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="tw-stroke-current tw-shrink-0 tw-w-6 tw-h-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Task failed successfully.</span>
        </div>
      )}
      <button
        className="tw-btn tw-btn-outline tw-w-full tw-max-w-xs"
        disabled={
          urlObj.loading ||
          !urlObj.url ||
          !urlObj.password ||
          !urlObj.isUrlValid
        }
        onClick={handleApiCall}
      >
        {urlObj.loading && (
          <span className="tw-loading tw-loading-spinner"></span>
        )}
        Shorten
      </button>
    </div>
  );
};
