using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PodNoms.Api.Migrations
{
    public partial class AddedSeenToChatMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Seen",
                table: "ChatMessages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Seen",
                table: "ChatMessages");
        }
    }
}
