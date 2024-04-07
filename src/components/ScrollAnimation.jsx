import { Stack, Typography, Box } from "@mui/material";
import { useRef, useState, useEffect } from "react";

const BoxWrapper = (props) => {
  const [top, setTop] = useState(() => -800);
  const [left, setLeft] = useState(() => -400);
  const [right, setRight] = useState(() => 400);
  const [scale, setScale] = useState(() => 1.1);
  const [rotate, setRotate] = useState(() => 360);

  const box = useRef();
  const handleScroll = () => {
    const { top } = box.current.getBoundingClientRect();

    if (top < 570) {
      setTop(0);

      setScale(1);
      setRotate(0);
      setTimeout(() => {
        setLeft(0);
        setRight(0);
        setScale(1);
      }, 400);
    }
  };
  window.addEventListener("scroll", handleScroll);
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <Box
      ref={box}
      sx={{ position: "relative", height: "160px", width: "350px" }}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          height: "100%",
          width: "100%",
          background: "hsl(320 100% 70%)",
          opacity: top !== 0 ? 0 : 1,
          transform:
            props.id % 2 === 0
              ? `translate(${left}px, ${top}px ) scale(${scale}) rotate(${rotate}deg)`
              : `translate(${right}px, ${top}px ) scale(${scale}) rotate(${rotate}deg)`,

          transition: "transform .7s cubic-bezier(.23,.45,0,1.53)",
        }}
      >
        <Typography variant="h3">{props.children}</Typography>
      </Stack>
    </Box>
  );
};

const ScrollAnimation = () => {
  const boxArray = [];
  for (let i = 1; i <= 100; i++)
    boxArray.push(
      <BoxWrapper id={i} key={i}>
        Box{i}
      </BoxWrapper>
    );
  return (
    <Stack
      spacing={2}
      // justifyContent={"center"}
      alignItems={"center"}
      sx={{ minHeight: "100vh" }}
    >
      {boxArray}
    </Stack>
  );
};

export default ScrollAnimation;
