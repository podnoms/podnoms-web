using Microsoft.EntityFrameworkCore.Migrations;

namespace PodNoms.Api.Migrations
{
    public partial class PK_OnParsedPlaylistItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "VideoId",
                table: "ParsedPlaylistItems",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ParsedPlaylistItems_VideoId_PlaylistId",
                table: "ParsedPlaylistItems",
                columns: new[] { "VideoId", "PlaylistId" },
                unique: true,
                filter: "[VideoId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ParsedPlaylistItems_VideoId_PlaylistId",
                table: "ParsedPlaylistItems");

            migrationBuilder.AlterColumn<string>(
                name: "VideoId",
                table: "ParsedPlaylistItems",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
