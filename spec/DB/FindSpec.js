const Datastore = require('nedb');
var db = require('../../main/db');

describe("Find queries", function(){

  beforeAll(function(){
    db.setDS(new Datastore({
      filename: 'spec/DB/mock.db',
      autoload: true,
      timestampData: true
    }));
  });

  it("gets total count", function(done) {
    db.getTotalCount(function(err, count){
      expect(err).toEqual(null);
      expect(count).toEqual(13);
      done();
    });
  }, 1000);

  it("gets scheduled for X (date) count 1", function(done) {
    db.getScheduledNowCount(function(err, count){
      expect(err).toEqual(null);
      expect(count).toEqual(3);
      done();
    }, new Date(1499140800000));
  }, 1000);

  it("gets scheduled for X (date) count 2", function(done) {
    db.getScheduledNowCount(function(err, count){
      expect(err).toEqual(null);
      expect(count).toEqual(4);
      done();
    }, new Date(1499140800001));
  }, 1000);

  it("gets scheduled for X (date) count 3", function(done) {
    db.getScheduledNowCount(function(err, count){
      expect(err).toEqual(null);
      expect(count).toEqual(10);
      done();
    }, new Date(1506913200000));
  }, 1000);

  it("gets scheduled for X (date) count 4", function(done) {
    db.getScheduledNowCount(function(err, count){
      expect(err).toEqual(null);
      expect(count).toEqual(11);
      done();
    }, new Date(1506913200001));
  }, 1000);


  it("gets nearest words correctly 1", function(done) {
    db.getNearestWords(3, function(err, docs){
      expect(err).toEqual(null);
      expect(docs[0].word).toEqual('超');
      expect(docs[1].word).toEqual('嗚呼');
      expect(docs[2].word).toEqual('世界');
      done();
    });
  }, 1000);

  it("gets nearest words correctly 2", function(done) {
    db.getNearestWords(10, function(err, docs){
      expect(err).toEqual(null);
      expect(docs[0].word).toEqual('超');
      expect(docs[1].word).toEqual('嗚呼');
      expect(docs[2].word).toEqual('世界');
      expect(docs[3].word).toEqual('猫');
      expect(docs[4].word).toEqual('喋');
      expect(docs[5].word).toEqual('犬');
      expect(docs[6].word).toEqual('地獄');
      expect(docs[7].word).toEqual('王国');
      expect(docs[8].word).toEqual('想像');
      expect(docs[9].word).toEqual('日本');
      done();
    });
  }, 1000);


  it("gets scheduled for now (or another date) 1", function(done) {
    db.getScheduledForNow(function(err, docs){
      expect(err).toEqual(null);
      expect(docs.length).toEqual(4);
      done();
    }, new Date("Tue Jul 04 2017 00:00:01"));
  }, 1000);

  it("gets scheduled for now (or another date) 2", function(done) {
    db.getScheduledForNow(function(err, docs){
      expect(err).toEqual(null);
      expect(docs.length).toEqual(5);
      expect(docs[0].word).toEqual('超');
      expect(docs[1].word).toEqual('嗚呼');
      expect(docs[2].word).toEqual('世界');
      expect(docs[3].word).toEqual('猫');
      expect(docs[4].word).toEqual('喋');
      done();
    }, new Date(1500820040503));
  }, 1000);

  it("gets a random doc", function(done) {
    db.getRandom(function(err, doc){
      expect(err).toEqual(null);
      expect(doc.word != '').toEqual(true);
      done();
    });
  }, 1000);

  it("get random (least reps)", function(done) {
    db.getRandomLeastReps(function(err, doc){
      expect(err).toEqual(null);
      expect(doc.word).toEqual('想像');
      done();
    }, 200);
  }, 1000);


  it("get random (sorted by last rep)", function(done) {
    db.getRandomLastRep(function(err, doc){
      expect(err).toEqual(null);
      expect(doc.word).toEqual('喋');
      done();
    }, 200);
  }, 1000);

});
