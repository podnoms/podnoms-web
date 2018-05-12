using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;
using PodNoms.Api.Models.Annotations;
using PodNoms.Api.Utils.Extensions;

namespace PodNoms.Api.Models {
    public interface ISluggedEntity {
        string Slug { get; set; }
    }

    public static class SluggedEntityExtensions {
        private class ProxySluggedModel : ISluggedEntity {
            public string Slug { get; set; }
        }
        public static IEnumerable<T> Select<T>(this IDataReader reader,
                                               Func<IDataReader, T> projection) {
            while (reader.Read()) {
                yield return projection(reader);
            }
        }
        public static IEnumerable<T> ExecSQL<T>(this DbContext context, string query) where T : class, ISluggedEntity, new() {
            using (var command = context.Database.GetDbConnection().CreateCommand()) {
                command.CommandText = query;
                command.CommandType = CommandType.Text;
                context.Database.OpenConnection();

                using (var reader = command.ExecuteReader()){
                    var result = reader.Select<T>(r => new T { 
                        Slug = r["Slug"] is DBNull ? string.Empty : r["Slug"].ToString()
                    });
                    return result.ToList();
                }
            }
        }
        public static string GetSlug(this ISluggedEntity entity, DbContext context, ILogger logger = null) {

            try {
                var property = entity.GetType().GetProperties()
                    .Where(prop => Attribute.IsDefined(prop, typeof(SlugFieldAttribute)))
                    .FirstOrDefault();
                if (property != null) {
                    var attribute = property.GetCustomAttributes(typeof(SlugFieldAttribute), false)
                        .FirstOrDefault();

                    Type t = entity.GetType();
                    var tableName = context.Model.FindEntityType(t).SqlServer().TableName;
                    if (!string.IsNullOrEmpty(tableName)) {
                        var sourceField = (attribute as SlugFieldAttribute).SourceField;
                        var slugSource = entity.GetType().GetProperty("Title").GetValue(entity, null).ToString();
                        var source = context.ExecSQL<ProxySluggedModel>($"SELECT Slug FROM {tableName}")
                            .Select(m => m.Slug);
                        return slugSource.Slugify(source);
                    }
                }
            } catch (Exception ex) {
                logger?.LogError($"Error slugifying {entity.GetType().Name} - {ex.Message}");
            }
            return string.Empty;
        }
    }
}