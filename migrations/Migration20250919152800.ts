import { Migration } from '@mikro-orm/migrations';

export class Migration20250919152800 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "files" jsonb null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "files";');
  }

}