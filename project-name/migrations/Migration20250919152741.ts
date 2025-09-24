import { Migration } from '@mikro-orm/migrations';

export class Migration20250919152741 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "files" jsonb null;`);
    this.addSql(`alter table "user" alter column "created_at" drop default;`);
    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "created_at" set not null;`);
    this.addSql(`alter table "user" alter column "updated_at" drop default;`);
    this.addSql(`alter table "user" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "updated_at" set not null;`);
    this.addSql(`alter table "user" drop constraint "user_email_key";`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "created_at" type timestamp(6) using ("created_at"::timestamp(6));`);
    this.addSql(`alter table "user" alter column "created_at" set default CURRENT_TIMESTAMP;`);
    this.addSql(`alter table "user" alter column "created_at" drop not null;`);
    this.addSql(`alter table "user" alter column "updated_at" type timestamp(6) using ("updated_at"::timestamp(6));`);
    this.addSql(`alter table "user" alter column "updated_at" set default CURRENT_TIMESTAMP;`);
    this.addSql(`alter table "user" alter column "updated_at" drop not null;`);
    this.addSql(`alter table "user" drop constraint "user_email_unique";`);
    this.addSql(`alter table "user" add constraint "user_email_key" unique ("email");`);
  }

}
