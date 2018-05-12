using System.ComponentModel.DataAnnotations.Schema;

namespace PodNoms.Api.Models {
    [Table("ServerConfig", Schema = "admin")]
    public class ServerConfig : BaseEntity, IEntity {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
