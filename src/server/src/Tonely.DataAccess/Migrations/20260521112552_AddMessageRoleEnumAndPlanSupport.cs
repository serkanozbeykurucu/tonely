using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tonely.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddMessageRoleEnumAndPlanSupport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER TABLE ""Messages""
                ALTER COLUMN ""Role"" TYPE integer
                USING CASE ""Role""
                    WHEN 'user'      THEN 0
                    WHEN 'assistant' THEN 1
                    ELSE 2
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                ALTER TABLE ""Messages""
                ALTER COLUMN ""Role"" TYPE character varying(50)
                USING CASE ""Role""
                    WHEN 0 THEN 'user'
                    WHEN 1 THEN 'assistant'
                    ELSE 'system'
                END
            ");
        }
    }
}
