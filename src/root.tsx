import Blurhash from "./components/blurhash";

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
      <Blurhash
        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        width={400}
        height={300}
        resolutionX={32}
        resolutionY={32}
        punch={1}
      />
      </body>
    </>
  );
};
