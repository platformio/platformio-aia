'use babel';

/**
 * Copyright (C) 2016 Ivan Kravets. All rights reserved.
 *
 * This source file is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License version 2
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import {spawn} from 'child_process';

module.exports = {
  activate: function() {
  	process.nextTick(function () {
  		const child = spawn(atom.packages.getApmPath(), ['install', 'platformio-ide']);
  		child.on('data', () => console.debug('data received'));
  		child.on('close', (code) => {
  		  if (0 !== code) {
  			onFail();
  		  } else {
  			const pack = atom.packages.enablePackage('platformio-ide');
  			if (!pack) {
  			  onFail();
  			}
  			atom.packages.activatePackage('platformio-ide');
  		  }
  		});
  	});

    function onFail() {
      atom.notifications.addError(
        'Failed to install PlatformIO IDE.',
        {dismissable: true});
    }
  }
};
