using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace PodNoms.Api.Migrations
{
    public partial class RemoveSlugFromEntry : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PodcastEntries_Slug_SourceUrl",
                table: "PodcastEntries");

            migrationBuilder.DropColumn(
                name: "Slug",
                table: "PodcastEntries");

            migrationBuilder.AlterColumn<string>(
                name: "SourceUrl",
                table: "PodcastEntries",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SourceUrl",
                table: "PodcastEntries",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Slug",
                table: "PodcastEntries",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PodcastEntries_Slug_SourceUrl",
                table: "PodcastEntries",
                columns: new[] { "Slug", "SourceUrl" },
                unique: true,
                filter: "[Slug] IS NOT NULL AND [SourceUrl] IS NOT NULL");
        }
    }
}
