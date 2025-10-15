// import Home from "@/pages/client/Home";
import Button from '@mui/material/Button';
import * as React from "react";
import RandomDashboard from "@/pages/RandomDashboard";
import Container from "@mui/material/Container";

export default function Page() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        {/*<RandomDashboard/>*/}
          <Container
          component="div"
          className={`bg-yellow-700 rounded-lg p-4 shadow-md`}>
              <RandomDashboard/>
          </Container>
          <Container
          component="div"
          className={`bg-yellow-700 rounded-lg p-4 shadow-md`}>
              <RandomDashboard/>
          </Container>
          <Container
              component="div"
              className={`bg-yellow-700 rounded-lg p-4 shadow-md`}>
              <RandomDashboard/>
          </Container>
      </main>
    </div>
  );
}
