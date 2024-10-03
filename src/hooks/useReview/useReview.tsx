import { useEffect } from "react";
import useAsyncStorage from "../useAsyncStorage/useAsyncStorage";
import * as StoreReview from "expo-store-review";
import moment from "moment";

const STORE_REVIEW_REQUEST_INTERVAL_WEEKS = 1;

const useReview = () => {
  const { getDataFromAsyncStorage, storeDataInAsyncStorage } = useAsyncStorage();

  const refreshNextStoreReviewRequest = () => {
    const nextRequestTime = moment().add(STORE_REVIEW_REQUEST_INTERVAL_WEEKS, "weeks");
    storeDataInAsyncStorage("nextStoreReviewRequest", nextRequestTime);
    return nextRequestTime;
  };

  const initNextStoreRequest = async () => {
    const nextStoreReviewRequest = await getDataFromAsyncStorage("nextStoreReviewRequest");
    if (!nextStoreReviewRequest) {
      // set next store review after 1 week if it is not set yet
      refreshNextStoreReviewRequest();
    }
  };

  useEffect(() => {
    initNextStoreRequest();
  }, []);

  // Also the Store-Review API of iOS and android handle it automatically
  // whether to show the request or not, we handle this manually
  // to prevent any bugs or unintenionally spams
  const requestStoreReview = async (forceRequest = false) => {
    const isAvailable = await StoreReview.isAvailableAsync();
    const hasAction = await StoreReview.hasAction();

    const canShowRequest = isAvailable && hasAction;

    if (forceRequest && canShowRequest) {
      await StoreReview.requestReview();
      return;
    }

    const now = moment();
    const nextStoreReviewRequest = await getDataFromAsyncStorage("nextStoreReviewRequest");
    if (now.isAfter(nextStoreReviewRequest) && canShowRequest) {
      StoreReview.requestReview();
      refreshNextStoreReviewRequest();
    }
  };

  return {
    requestStoreReview,
  };
};

export default useReview;
