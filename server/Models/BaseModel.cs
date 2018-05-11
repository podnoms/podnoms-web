using System;

namespace PodNoms.Api.Models {
    public class BaseModel : IEntity {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }

    public interface IEntity {
        int Id { get; set; }
        DateTime CreateDate { get; set; }
        DateTime UpdateDate { get; set; }
    }
}