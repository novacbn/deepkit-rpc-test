import { ControllerSymbol, rpc } from "@deepkit/rpc";
import { Observable } from "rxjs";

export const ITestController =
  ControllerSymbol<ITestController>("TestController");
export interface ITestController {
  get_version(): Promise<string>;

  test_observable(): Observable<number>;
}

@rpc.controller(ITestController)
export class TestController implements ITestController {
  @rpc.action()
  async get_version(): Promise<string> {
    return "1.0.0";
  }

  @rpc.action()
  test_observable(): Observable<number> {
    return new Observable<number>((observer) => {
      let count = 0;

      const identifier = setInterval(() => {
        observer.next(count);
        count += 1;
      }, 1000);

      return {
        unsubscribe: () => {
          clearInterval(identifier);
        },
      };
    });
  }
}
