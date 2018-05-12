using System;

namespace PodNoms.Api.Models {
    public interface IEntity {
        int Id { get; set; }
        DateTime CreateDate { get; set; }
        DateTime UpdateDate { get; set; }
    }
}