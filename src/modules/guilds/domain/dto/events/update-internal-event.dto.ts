import { PartialType } from '@nestjs/mapped-types';
import { CreateInternalEventDto } from './create-internal-event.dto';

/**
 * Permite editar cualquier campo excepto:
 *  • status (se gestiona en otro endpoint)
 *  • attendeeCount / highlighted (este último tiene toggle dedicado)
 */
export class UpdateInternalEventDto extends PartialType(CreateInternalEventDto) {}