using Microsoft.EntityFrameworkCore.Migrations;

namespace portal_api.Migrations
{
    public partial class AllowDeletedUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pictures_PortalUsers_CreatorUserId",
                table: "Pictures");

            migrationBuilder.DropForeignKey(
                name: "FK_RequestItems_PortalUsers_RelatedPersonUserId",
                table: "RequestItems");

            migrationBuilder.AlterColumn<int>(
                name: "RelatedPersonUserId",
                table: "RequestItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Pictures_PortalUsers_CreatorUserId",
                table: "Pictures",
                column: "CreatorUserId",
                principalTable: "PortalUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_RequestItems_PortalUsers_RelatedPersonUserId",
                table: "RequestItems",
                column: "RelatedPersonUserId",
                principalTable: "PortalUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pictures_PortalUsers_CreatorUserId",
                table: "Pictures");

            migrationBuilder.DropForeignKey(
                name: "FK_RequestItems_PortalUsers_RelatedPersonUserId",
                table: "RequestItems");

            migrationBuilder.AlterColumn<int>(
                name: "RelatedPersonUserId",
                table: "RequestItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pictures_PortalUsers_CreatorUserId",
                table: "Pictures",
                column: "CreatorUserId",
                principalTable: "PortalUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RequestItems_PortalUsers_RelatedPersonUserId",
                table: "RequestItems",
                column: "RelatedPersonUserId",
                principalTable: "PortalUsers",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
