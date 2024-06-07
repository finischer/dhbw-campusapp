import { useEffect, useState } from "react";
import useAsyncStorage from "../useAsyncStorage/useAsyncStorage";
import * as StoreReview from "expo-store-review";
import * as Linking from "expo-linking";
import moment, { Moment } from "moment";

const STORE_REVIEW_REQUEST_INTERVAL_WEEKS = 1;

const useReview = () => {
  const { getDataFromAsyncStorage, storeDataInAsyncStorage } = useAsyncStorage();
  const [nextStoreReviewRequest, setNextStoreReviewRequest] = useState<Moment | null>(null);

  const refreshNextStoreReviewRequest = () => {
    const nextRequestTime = moment().add(STORE_REVIEW_REQUEST_INTERVAL_WEEKS, "weeks");
    setNextStoreReviewRequest(nextRequestTime);
    storeDataInAsyncStorage("nextStoreReviewRequest", nextRequestTime);
    return nextRequestTime;
  };

  const initNextStoreRequest = async () => {
    const nextStoreReviewRequest = await getDataFromAsyncStorage("nextStoreReviewRequest");
    if (!nextStoreReviewRequest) {
      // set next store review after 3 weeks if it is not set yet
      refreshNextStoreReviewRequest();
    } else {
      setNextStoreReviewRequest(nextStoreReviewRequest);
    }
  };

  useEffect(() => {
    initNextStoreRequest();
  }, []);

  // Also the Store-Review API of iOS and android handle it automatically
  // whether to show the request or not, we handle this manually
  // to prevent any bugs or unintenionally spams
  const requestStoreReview = async (forceRequest = false) => {
    console.log("Execute requestStoreReview");
    const isAvailable = await StoreReview.isAvailableAsync();
    const hasAction = await StoreReview.hasAction();

    const canShowRequest = isAvailable && hasAction;

    if (forceRequest && canShowRequest) {
      console.log("Request review!");
      await StoreReview.requestReview();
      return;
    }

    const now = moment();
    if (now.isAfter(nextStoreReviewRequest) && canShowRequest) {
      console.log("Request review!");
      StoreReview.requestReview();
      refreshNextStoreReviewRequest();
    }
  };

  return {
    requestStoreReview,
  };
};

export default useReview;
