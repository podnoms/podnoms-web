using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PodNoms.Api.Models {
    public class BaseModel : IEntity {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        // TODO replace Id with below
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid NewId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreateDate { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime UpdateDate { get; set; }

        public string ExposedUid { get => NewId.ToString(); }
    }

    public interface IEntity {
        int Id { get; set; }
        DateTime CreateDate { get; set; }
        DateTime UpdateDate { get; set; }
    }
}