import {
    ViewEntity, ViewColumn,
    DataSource,
  } from 'typeorm';
  
  // ------------------------------------------------------------------
  // Nota: TypeORM genera la vista si 'materialized' = false. Aquí la
  // mapeamos solo para lectura (definición ya creada vía migración).
  // ------------------------------------------------------------------
  @ViewEntity({
    name: 'search_index',
    expression: (ds: DataSource) => ds
      .createQueryBuilder()
      .select("'stub'")   // la expresión real está en la migración SQL
      .where('false'),
    materialized: true,
  })
  export class SearchIndex {
    @ViewColumn({ name: 'obj_type' })
    objType!: 'character' | 'guild' | 'event';
  
    @ViewColumn({ name: 'obj_id' })
    objId!: string;
  
    @ViewColumn()
    title!: string;
  
    @ViewColumn()
    preview!: string;
  
    //@ViewColumn({ type: 'tsvector' })
    //tsv!: unknown;           // No se usa en la app, solo para ranking
  
    // helper para URL
    get url(): string {
      switch (this.objType) {
        case 'character': return `/characters/${this.objId}`;
        case 'guild':     return `/guilds/${this.objId}`;
        case 'event':     return `/events/${this.objId}`;
      }
    }
  }
  