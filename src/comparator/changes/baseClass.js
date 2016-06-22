/*
 * Copyright 2016 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const baseChanges = require("./base");
const constructors = exports.constructors = {};
const abstractConstructors = exports.abstractConstructors = {};

class ParentChange extends baseChanges.abstractConstructors.Change {
    getParent1() {
        return this.config.parent1;
    }

    getParent2() {
        return this.config.parent2;
    }
}
constructors.ParentChange = ParentChange;

class MemberChange extends baseChanges.abstractConstructors.Change {
    getMemberName() {
        return this.config.memberName;
    }

    getKey() {
        return `${super.getKey()}|${this.getMemberName()}`;
    }

    getMember1() {
        return this.config.member1;
    }

    getMember2() {
        return this.config.member2;
    }
}
constructors.MemberChange = MemberChange;

class MemberImpact extends baseChanges.abstractConstructors.Impact {
    getMemberName() {
        return this.config.memberName;
    }

    getKey() {
        return `${super.getKey()}|${this.getMemberName()}`;
    }

    getMember1() {
        return this.config.member1;
    }

    getMember2() {
        return this.config.member2;
    }
}
abstractConstructors.MemberImpact = MemberImpact;

class MemberAdded extends MemberImpact {}
constructors.MemberAdded = MemberAdded;

class MemberRemoved extends MemberImpact {}
constructors.MemberRemoved = MemberRemoved;

class MemberSignatureChanged extends MemberImpact {}
constructors.MemberSignatureChanged = MemberSignatureChanged;

class MemberImplementationChanged extends MemberImpact {}
constructors.MemberImplementationChanged = MemberImplementationChanged;

class SpecialMemberImpact extends baseChanges.abstractConstructors.Impact {
    getMemberName() {
        return this.config.memberName;
    }

    getKey() {
        return `${super.getKey()}|${this.getMemberName()}`;
    }

    isPropagatable() {
        return false;
    }
}
abstractConstructors.SpecialMemberImpact = SpecialMemberImpact;

class RemovedMemberStillUsed extends SpecialMemberImpact {}
constructors.RemovedMemberStillUsed = RemovedMemberStillUsed;

class UsedMemberChangedSignature extends SpecialMemberImpact {}
constructors.UsedMemberChangedSignature = UsedMemberChangedSignature;

class OverriddenMemberImpact extends SpecialMemberImpact {
    getOverridingMember1() {
        return this.config.overridingMember1;
    }

    getOverridingMember2() {
        return this.config.overridingMember2;
    }

    getMember1() {
        return this.config.member1;
    }

    getMember2() {
        return this.config.member2;
    }
}
abstractConstructors.OverriddenMemberImpact = OverriddenMemberImpact;

class OverriddenParentMemberImpact extends OverriddenMemberImpact {}
abstractConstructors.OverriddenParentMemberImpact = OverriddenParentMemberImpact;

class OverriddenParentMemberAdded extends OverriddenParentMemberImpact {}
constructors.OverriddenParentMemberAdded = OverriddenParentMemberAdded;

class OverriddenParentMemberRemoved extends OverriddenParentMemberImpact {}
constructors.OverriddenParentMemberRemoved = OverriddenParentMemberRemoved;

class OverriddenParentMemberSignatureChanged extends OverriddenParentMemberImpact {}
constructors.OverriddenParentMemberSignatureChanged = OverriddenParentMemberSignatureChanged;

class OverriddenParentMemberImplementationChanged extends OverriddenParentMemberImpact {}
constructors.OverriddenParentMemberImplementationChanged = OverriddenParentMemberImplementationChanged;

class OverriddenParentDependencyMemberImpact extends OverriddenMemberImpact {
    getOverridingMember1Name() {
        return this.config.overridingMember1Name;
    }

    getOverridingMember2Name() {
        return this.config.overridingMember2Name;
    }
}
abstractConstructors.OverriddenParentDependencyMemberImpact = OverriddenParentDependencyMemberImpact;

class OverriddenParentDependencyMemberAdded extends OverriddenParentDependencyMemberImpact {}
constructors.OverriddenParentDependencyMemberAdded = OverriddenParentDependencyMemberAdded;

class OverriddenParentDependencyMemberRemoved extends OverriddenParentDependencyMemberImpact {}
constructors.OverriddenParentDependencyMemberRemoved = OverriddenParentDependencyMemberRemoved;

class OverriddenParentDependencyMemberSignatureChanged extends OverriddenParentDependencyMemberImpact {}
constructors.OverriddenParentDependencyMemberSignatureChanged = OverriddenParentDependencyMemberSignatureChanged;

class OverriddenParentDependencyMemberImplementationChanged extends OverriddenParentDependencyMemberImpact {}
constructors.OverriddenParentDependencyMemberImplementationChanged = OverriddenParentDependencyMemberImplementationChanged;
