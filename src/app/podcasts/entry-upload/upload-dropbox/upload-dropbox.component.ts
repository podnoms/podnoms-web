import { AfterViewInit, Component } from '@angular/core';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';
import { environment } from '../../../../environments/environment';
import { BaseJsUploadComponent } from '../../base-js-upload.component';
import { EntryDataService } from '../../entry-data.service';
declare var Dropbox: any;

@Component({
  selector: 'app-upload-dropbox',
  templateUrl: './upload-dropbox.component.html',
  styleUrls: ['./upload-dropbox.component.scss'],
})
export class UploadDropboxComponent
  extends BaseJsUploadComponent
  implements AfterViewInit {
  constructor(
    podcastEntryDataService: EntryDataService,
    uiStateService: UiStateService,
    logger: NGXLogger
  ) {
    super(podcastEntryDataService, logger, uiStateService);
    this.loadScript(
      'https://www.dropbox.com/static/api/2/dropins.js',
      'dropboxjs',
      {
        'data-app-key': environment.dropboxAppKey,
      }
    );
  }
  ngAfterViewInit(): void {
    this.browseDropbox();
  }

  browseDropbox() {
    const options = {
      // Required. Called when a user selects an item in the Chooser.
      success: this.parseFileList.bind(this),
      linkType: 'direct', // or "direct"
      multiselect: true, // or true
      extensions: this.getSupportedFileTypes('audio'),
      folderselect: false, // or true
    };

    Dropbox.choose(options);
  }
}
