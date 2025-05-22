import { Injectable } from "@nestjs/common";
import { DEFAULT_CHARACTER_PROPERTIES } from "src/config/default-character-properties";
import { IDefaultCharacterPropertiesProvider } from "../../application/ports/i-default-properties.provider";

@Injectable()
export class DefaultPropertiesProvider implements IDefaultCharacterPropertiesProvider {
  getDefaults() {
    return DEFAULT_CHARACTER_PROPERTIES;
  }
}