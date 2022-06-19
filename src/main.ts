import { DirectClient, RpcKernel } from "@deepkit/rpc";

import { ITestController, TestController } from "./controller";

(async () => {
  const kernel = new RpcKernel();
  kernel.registerController(ITestController, TestController);

  const client = new DirectClient(kernel);
  const controller = client.controller(ITestController);

  const version = await controller.get_version();
  console.log("get_version", { version });

  const counter = await controller.test_observable();
  counter.subscribe((current_count) => {
    console.log("test_observable", { current_count });
  });
})();
