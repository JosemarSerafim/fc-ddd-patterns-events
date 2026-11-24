import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import { CustomerAddressChanged } from "./customer-address-changed.event";
import { CustomerCreated } from "./customer-created.event";
import { EnviaConsoleLog1Handler } from "./handlers/envia-console-log-1.handler";
import { EnviaConsoleLog2Handler } from "./handlers/envia-console-log-2.handler";
import { EnviaConsoleLogHandler } from "./handlers/envia-console-log.handler";

describe("Customer Events Unit Test", () => {
  test("should trigger an event when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventhandler2 = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerCreated", eventHandler1);
    eventDispatcher.register("CustomerCreated", eventhandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreated"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreated"].length).toBe(2);

    const spyOnHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyOnHandler2 = jest.spyOn(eventhandler2, "handle");
    const customerCreated = new CustomerCreated(new Customer("1", "Josemar"));
    eventDispatcher.notify(customerCreated);

    expect(spyOnHandler1).toBeCalledTimes(1);
    expect(spyOnHandler2).toBeCalledTimes(1);
  });

  test("should trigger when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyHandler = jest.spyOn(eventHandler, "handle");
    const spyLogMessage = jest.spyOn(console, "log");

    eventDispatcher.register("CustomerAddressChanged", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"].length,
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChanged"][0],
    ).toMatchObject(eventHandler);

    const customer = new Customer("1", "Josemar");

    const address = new Address("BH", 12, "123", "Luanda");
    customer.changeAddress(address);
    const customerAddressChanged = new CustomerAddressChanged({
      id: customer.id,
      nome: customer.name,
      endereco: customer.Address.toString(),
    });

    eventDispatcher.notify(customerAddressChanged);
    expect(spyHandler).toHaveBeenCalled();
    expect(spyHandler).toHaveBeenCalledTimes(1);
    expect(spyLogMessage).toHaveBeenCalledWith(
      "Endereço do cliente: 1, Josemar alterado para: BH, 12, 123 Luanda",
    );
  });
});
