"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInQuestionAndAnswer1679898582528 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInQuestionAndAnswer1679898582528 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'question-answer',
                },
            });
            if (plugin) {
                plugin.pluginName = 'QuestionAndAnswer';
                plugin.pluginTimestamp = 1665135279238; // This Add-on's Plugin Migration Timestamp
                yield repo.save(plugin);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPluginTimestampInQuestionAndAnswer1679898582528 = AddPluginTimestampInQuestionAndAnswer1679898582528;
//# sourceMappingURL=1679898582528-AddPluginTimestampInQuestionAndAnswer.js.map