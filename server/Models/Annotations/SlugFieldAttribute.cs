using System;
namespace PodNoms.Api.Models.Annotations {
    [System.AttributeUsage(System.AttributeTargets.Property)]
    public class SlugFieldAttribute : Attribute {
        private readonly string _sourceField;

        public string SourceField => _sourceField;
        public SlugFieldAttribute(string sourceField) {
            this._sourceField = sourceField;
        }

    }
}