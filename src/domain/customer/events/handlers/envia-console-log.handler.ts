import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import { CustomerAddressChanged } from "../customer-address-changed.event";

export class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChanged> {
  handle(event: CustomerAddressChanged): void {
    const { nome, endereco, id } = event.eventData;
    console.log(
      `Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`,
    );
  }
}
