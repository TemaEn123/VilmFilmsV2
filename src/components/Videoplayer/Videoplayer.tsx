import { useEffect, useState } from "react";

import VideoplayerSkeleton from "../../ui/VideoplayerSkeleton/VideoplayerSkeleton";

const Videoplayer = () => {
  const [scriptHtml, setScriptHtml] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const dataUrl = window.location.href;
    setIsLoading(true);
    fetch(
      "//js.espanplay.site/get_player?w=610&h=370&type=widget&kp_id=&players=apicollaps,videocdn,hdvb,bazon,alloha,ustore,kodik,trailer&r_id=videoplayers&ani=COLLAPS&ati=&adi=&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=" +
        dataUrl
    )
      .then((res) => res.text())
      .then((data) => setScriptHtml(data.match(/<iframe.*<\/iframe>/gm)![1]))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  console.log(error);

  return (
    <>
      {isLoading || error ? (
        <VideoplayerSkeleton isLoading={isLoading} />
      ) : (
        <div
          className="videooplayerSkeleton"
          id="videoplayers"
          dangerouslySetInnerHTML={{ __html: scriptHtml }}
        ></div>
      )}
    </>
  );
};

export default Videoplayer;
