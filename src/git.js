var getGitRepo = function(githubName, githubToken) {
  // initialize repo
  var repo = {};

  // Mixin the main library using github to provide the following:
  // - repo.loadAs(type, hash) => value
  // - repo.saveAs(type, value) => hash
  // - repo.listRefs(filter='') => [ refs ]
  // - repo.readRef(ref) => hash
  // - repo.updateRef(ref, hash) => hash
  // - repo.deleteRef(ref) => null
  // - repo.createTree(entries) => hash
  // - repo.hasHash(hash) => has
  require('js-github/mixins/github-db')(repo, githubName, githubToken);

  // Github has this built-in, but it's currently very buggy so we replace with
  // the manual implementation in js-git.
  require('js-git/mixins/create-tree')(repo);

  // Cache github objects locally in indexeddb
  require('js-git/mixins/add-cache')(repo, require('js-git/mixins/indexed-db'));

  // Cache everything except blobs over 100 bytes in memory.
  // This makes path-to-hash lookup a sync operation in most cases.
  require('js-git/mixins/mem-cache')(repo);

  // Combine concurrent read requests for the same hash
  require('js-git/mixins/read-combiner')(repo);

  // Add in value formatting niceties.  Also adds text and array types.
  require('js-git/mixins/formats')(repo);

  return repo;
};

if(typeof window !== "undefined" && window !== null) {
  window.getGitRepo = getGitRepo;
}

module.exports = getGitRepo;
