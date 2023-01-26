import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConnectorService } from '../../execution/service/connector.service';
import { ConnectorDto } from '../dto/connector.dto';
import { ConnectorDtoMapper } from '../mapper/connector.mapper';

@ApiTags('Connector')
@Controller('/connectors')
export class ConnectorController {
  constructor(
    private connectorService: ConnectorService,
    private connectorMapper: ConnectorDtoMapper,
  ) {}

  @Get()
  async getAllConnectors(): Promise<ConnectorDto[]> {
    return this.connectorService
      .getAll()
      .map((connector) => this.connectorMapper.connectorToDto(connector));
  }
}
