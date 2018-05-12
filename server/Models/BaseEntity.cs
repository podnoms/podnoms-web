using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PodNoms.Api.Models {
    public class BaseEntity : IEntity {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        //TODO: Remove once migration is complete
        public string Uid { get; set; }
        // TODO replace Id with below
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid NewId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime UpdateDate { get; set; } = DateTime.UtcNow;

        public string ExposedUid { get => NewId.ToString(); }
    }
}