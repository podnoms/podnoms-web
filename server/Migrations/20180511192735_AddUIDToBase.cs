using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PodNoms.Api.Migrations {
    public partial class AddUIDToBase : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<Guid>(
                name: "NewId",
                table: "Podcasts",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "NewId",
                table: "PodcastEntries",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "NewId",
                table: "Playlists",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Uid",
                table: "Playlists",
                nullable: false,
                defaultValue: System.Guid.NewGuid());

            migrationBuilder.AddColumn<Guid>(
                name: "NewId",
                table: "ParsedPlaylistItems",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Uid",
                table: "ParsedPlaylistItems",
                nullable: false,
                defaultValue: System.Guid.NewGuid());

            migrationBuilder.AddColumn<Guid>(
                name: "NewId",
                table: "ChatMessages",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Uid",
                table: "ChatMessages",
                nullable: false,
                defaultValue: System.Guid.NewGuid());

            migrationBuilder.Sql("UPDATE Podcasts SET NewId = Uid WHERE NewId = '00000000-0000-0000-0000-000000000000' AND Uid IS NOT NULL");
            migrationBuilder.Sql("UPDATE PodcastEntries SET NewId = Uid WHERE NewId = '00000000-0000-0000-0000-000000000000' AND Uid IS NOT NULL");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Podcasts",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "Podcasts",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "PodcastEntries",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "PodcastEntries",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "Playlists",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "Playlists",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "ParsedPlaylistItems",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "ParsedPlaylistItems",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateDate",
                table: "ChatMessages",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdateDate",
                table: "ChatMessages",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()",
                oldClrType: typeof(DateTime));
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "NewId",
                table: "Podcasts");

            migrationBuilder.DropColumn(
                name: "NewId",
                table: "PodcastEntries");

            migrationBuilder.DropColumn(
                name: "NewId",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "Uid",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "NewId",
                table: "ParsedPlaylistItems");

            migrationBuilder.DropColumn(
                name: "Uid",
                table: "ParsedPlaylistItems");

            migrationBuilder.DropColumn(
                name: "NewId",
                table: "ChatMessages");

            migrationBuilder.DropColumn(
                name: "Uid",
                table: "ChatMessages");
        }
    }
}
